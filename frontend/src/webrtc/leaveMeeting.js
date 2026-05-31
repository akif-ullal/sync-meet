import {
    endMeeting
} from "../services/meetingService";

export const leaveMeeting = async ({

    roomId,

    localStream,

    localVideoRef,

    peerConnections,

    socketRef,

    setRemoteStreams,

    navigate

}) => {

    try {

        // SAVE MEETING END TIME
        await endMeeting(roomId);

    } catch (error) {

        console.log(error);
    }

    // 1. STOP CAMERA + MIC
    if (localStream.current) {

        localStream.current
            .getTracks()
            .forEach((track) => {

                track.stop();
            });
    }

    // 2. CLEAR LOCAL VIDEO
    if (localVideoRef.current) {

        localVideoRef.current.pause();

        localVideoRef.current.srcObject =
            null;
    }

    // 3. CLOSE ALL PEER CONNECTIONS
    Object.values(
        peerConnections.current
    ).forEach((pc) => {

        pc.close();
    });

    // 4. CLEAR CONNECTION OBJECT
    peerConnections.current = {};

    // 5. CLEAR REMOTE STREAMS
    setRemoteStreams([]);

    // 6. DISCONNECT SOCKET
    setTimeout(() => {

        if (socketRef.current) {

            socketRef.current.disconnect();
        }

        navigate("/");

    }, 200);
};