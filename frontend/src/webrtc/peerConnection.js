export const createPeerConnection = ({
    socketId,
    userId,
    peerConnections,
    peerMeta,
    localStream,
    socketRef,
    setRemoteStreams,
    servers
}) => {

    // already exists
    if (peerConnections.current[socketId]) {
        return peerConnections.current[socketId];
    }

    console.log("Creating Peer Connection For:",socketId);

    const pc = new RTCPeerConnection(servers);

    // store connection
    peerConnections.current[socketId] = pc;

    peerMeta.current[socketId] = {
        userId: userId
    };
    
    // add local tracks
    localStream.current
        .getTracks()
        .forEach((track) => {

            pc.addTrack(
                track,
                localStream.current
            );
        });

    // receive remote stream
    pc.ontrack = (event) => {

        const userId = peerMeta.current[socketId]?.userId;

        console.log("Remote Stream Received");

        setRemoteStreams((prev) => {

            const alreadyExists =prev.find((item) =>
                        item.socketId === socketId
                );

            if (alreadyExists) {
                return prev;
            }

            return [
                ...prev,
                {
                    socketId,
                    stream: event.streams[0],
                    userId 
                }
            ];
        });
    };

    // send ICE candidate
    pc.onicecandidate = (event) => {

        if (event.candidate) {

            socketRef.current.emit(
                "ice-candidate",
                {
                    candidate: event.candidate,
                    to: socketId
                }
            );
        }
    };

    // connection state
    pc.onconnectionstatechange = () => {

        console.log("Connection State:",pc.connectionState);
    };

    return pc;
};