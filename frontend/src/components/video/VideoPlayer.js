import {
    useEffect,
    useRef
} from "react";

import "../../styles/video/videoPlayer.css";

const VideoPlayer = ({
    stream
}) => {

    const videoRef = useRef();

    useEffect(() => {

        // ADD STREAM
        if (
            videoRef.current &&
            stream
        ) {

            videoRef.current.srcObject =
                stream;
        }

        // CLEANUP
        return () => {

            if (videoRef.current) {

                if (
                    videoRef.current.srcObject
                ) {

                    videoRef.current
                        .srcObject
                        .getTracks()
                        .forEach((track) => {

                            track.stop();
                        });
                }

                videoRef.current.pause();

                videoRef.current.srcObject =
                    null;

                videoRef.current.load();
            }
        };

    }, [stream]);

    return (

        <video
            ref={videoRef}
            autoPlay
            playsInline
            className="videoPlayer"
        />
    );
};

export default VideoPlayer;