import { createPeerConnection }from "../webrtc/peerConnection";

export const registerSocketEvents = ({

    socketRef,

    peerConnections,

    peerMeta,

    localStream,

    setRemoteStreams,

    setParticipants,

    servers

}) => {

    // CONNECT
    socketRef.current.on(
        "connect",
        () => {
            console.log("Socket Connected:",socketRef.current.id);
        }
    );

    socketRef.current.on("room-users", (users) => {
        setParticipants(users);
    });


    // USER JOINED
    socketRef.current.on(
        "user-joined",
        async (data) => {

            console.log("User Joined:",data);
            console.log("User ID:", data?.userId);

            const pc = createPeerConnection({

                    socketId: data.socketId,

                    userId: data.userId,

                    peerConnections,

                    peerMeta,

                    localStream,

                    socketRef,

                    setRemoteStreams,

                    servers
                });

            const offer = await pc.createOffer();

            await pc.setLocalDescription(offer);

            socketRef.current.emit(
                "offer",
                {
                    offer,
                    to: data.socketId
                }
            );
        }
    );



    // RECEIVE OFFER
    socketRef.current.on(
        "offer",
        async (data) => {

            console.log("Offer Received");

            const pc = createPeerConnection({

                    socketId: data.from,
                    
                    userId: data.userId,

                    peerConnections,

                    peerMeta,

                    localStream,

                    socketRef,

                    setRemoteStreams,

                    servers
                });

            if (pc.signalingState !== "stable") {
                console.log("Skipping duplicate offer");
                return;
            }

            await pc.setRemoteDescription(new RTCSessionDescription(data.offer));

            const answer =await pc.createAnswer();

            await pc.setLocalDescription(answer);

            socketRef.current.emit(
                "answer",
                {
                    answer,
                    to: data.from
                }
            );
        }
    );



    // RECEIVE ANSWER
    socketRef.current.on(
        "answer",
        async (data) => {

            console.log("Answer Received");

            const pc = peerConnections.current[data.from];

            if (pc.signalingState !== "have-local-offer") {
                console.log("Skipping invalid answer");
                return;
            }

            await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
    );



    // RECEIVE ICE
    socketRef.current.on(
        "ice-candidate",
        async (data) => {

            try {

                const pc =peerConnections.current[data.from];

                if (!pc) {
                    return;
                }

                await pc.addIceCandidate(new RTCIceCandidate(data.candidate));

            } catch (error) {

                console.log(error);
            }
        }
    );



    // USER DISCONNECTED
    socketRef.current.on("user-disconnected", ({ socketId }) => {

    console.log("User Disconnected:", socketId);

    if (peerConnections.current[socketId]) {
        peerConnections.current[socketId].close();
        delete peerConnections.current[socketId];
    }

    setRemoteStreams((prev) =>
        prev.filter((item) => item.socketId !== socketId)
    );

    // OPTIONAL: also update participants UI immediately
    setParticipants((prev) =>
        prev.filter((u) => u.socketId !== socketId)
    );
    });
};