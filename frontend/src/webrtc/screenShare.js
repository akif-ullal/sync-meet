export const shareScreen = async ({
    peerConnections,
    localVideoRef,
    localStream,
    setIsScreenSharing
}) => {

    try {

        const screenStream =
            await navigator.mediaDevices
                .getDisplayMedia({
                    video: true
                });

        const screenTrack =
            screenStream.getVideoTracks()[0];



        // replace video track
        Object.values(
            peerConnections.current
        ).forEach((pc) => {

            const sender =
                pc.getSenders().find(
                    (s) =>
                        s.track &&
                        s.track.kind === "video"
                );

            if (sender) {

                sender.replaceTrack(
                    screenTrack
                );
            }
        });



        // show screen locally
        if (localVideoRef.current) {

            localVideoRef.current.pause();

            localVideoRef.current.srcObject =
                screenStream;

            localVideoRef.current.load();

            localVideoRef.current.play()
                .catch((err) =>
                    console.log(err)
                );
        }



        setIsScreenSharing(true);



        // stop sharing automatically
        screenTrack.onended = () => {

            stopScreenSharing({

                peerConnections,

                localVideoRef,

                localStream,

                setIsScreenSharing
            });
        };

    } catch (error) {

        console.log(error);
    }
};



export const stopScreenSharing = ({
    peerConnections,
    localVideoRef,
    localStream,
    setIsScreenSharing
}) => {

    const videoTrack =
        localStream.current
            .getVideoTracks()[0];



    // restore webcam track
    Object.values(
        peerConnections.current
    ).forEach((pc) => {

        const sender =
            pc.getSenders().find(
                (s) =>
                    s.track &&
                    s.track.kind === "video"
            );

        if (sender) {

            sender.replaceTrack(
                videoTrack
            );
        }
    });



    // restore webcam locally
    if (localVideoRef.current) {

        localVideoRef.current.pause();

        localVideoRef.current.srcObject =
            localStream.current;

        localVideoRef.current.load();

        localVideoRef.current.play()
            .catch((err) =>
                console.log(err)
            );
    }



    setIsScreenSharing(false);
};