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

    // If already exists, return existing connection
    if (peerConnections.current[socketId]) {
        return peerConnections.current[socketId];
    }

    console.log("Creating Peer Connection For:", socketId);

    const pc = new RTCPeerConnection(servers);

    // store connection
    peerConnections.current[socketId] = pc;

    // store metadata
    peerMeta.current[socketId] = {
        userId
    };

    // ================================
    // ADD LOCAL STREAM TRACKS
    // ================================
    if (localStream.current) {
        localStream.current.getTracks().forEach((track) => {
            pc.addTrack(track, localStream.current);
        });
    }

    // ================================
    // RECEIVE REMOTE STREAM
    // ================================
    pc.ontrack = (event) => {

        const remoteUserId =
            peerMeta.current[socketId]?.userId;

        console.log("Remote Stream Received from:", socketId);

        setRemoteStreams((prev) => {

            // IMPORTANT: always replace stream (fix mobile freeze issue)
            const filtered = prev.filter(
                (item) => item.socketId !== socketId
            );

            return [
                ...filtered,
                {
                    socketId,
                    stream: event.streams[0],
                    userId: remoteUserId
                }
            ];
        });
    };

    // ================================
    // ICE CANDIDATE
    // ================================
    pc.onicecandidate = (event) => {

        if (event.candidate) {

            socketRef.current.emit("ice-candidate", {
                candidate: event.candidate,
                to: socketId
            });
        }
    };

    // ================================
    // CONNECTION STATE DEBUG + RECOVERY
    // ================================
    pc.onconnectionstatechange = () => {

        console.log(
            "CONNECTION STATE:",
            socketId,
            pc.connectionState
        );
    };

    pc.oniceconnectionstatechange = () => {

        console.log(
            "ICE STATE:",
            socketId,
            pc.iceConnectionState
        );

        // Try recovery on mobile network drop
        if (
            pc.iceConnectionState === "disconnected" ||
            pc.iceConnectionState === "failed"
        ) {

            console.log(
                "ICE restart triggered for:",
                socketId
            );

            try {
                pc.restartIce?.();
            } catch (err) {
                console.log("ICE restart error:", err);
            }
        }
    };

    // ================================
    // OPTIONAL DEBUG STATS (remove in production)
    // ================================
    setInterval(() => {

        if (!peerConnections.current[socketId]) return;

        pc.getStats().then((stats) => {

            stats.forEach((report) => {

                if (report.type === "inbound-rtp") {

                    console.log(
                        "PACKET LOSS:",
                        socketId,
                        report.packetsLost
                    );
                }
            });

        });

    }, 10000);

    return pc;
};