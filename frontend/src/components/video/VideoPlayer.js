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

        if (
            videoRef.current &&
            stream
        ) {

            videoRef.current.srcObject =
                stream;
        }

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