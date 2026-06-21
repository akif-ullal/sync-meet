import {
    useEffect,
    useRef
} from "react";

import "../../styles/video/videoPlayer.css";

const VideoPlayer = ({
    stream
}) => {

    const videoRef = useRef(null);

    useEffect(() => {

        const video =
            videoRef.current;

        if (
            video &&
            stream
        ) {

            video.srcObject =
                stream;
        }

        return () => {

            if (video) {

                video.pause();

                video.srcObject =
                    null;
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