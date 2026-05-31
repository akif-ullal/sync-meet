import { useEffect, useRef, useState } from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import VideoPlayer from "../video/VideoPlayer";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/layout/videoGrid.css";

const VideoGrid = ({
    localStream,
    remoteStreams = []
}) => {

    const [selectedVideo, setSelectedVideo] = useState("local");
    const [isFullScreen, setIsFullScreen] = useState(false);

    const mainContainerRef = useRef(null);

    const selectedRemote = remoteStreams.find(
        (item) => item.socketId === selectedVideo
    );

    // Attach local stream (MAIN)
    useEffect(() => {

        const video = document.getElementById("main-local-video");

        if (video && localStream && selectedVideo === "local") {
            video.srcObject = localStream;
        }

    }, [localStream, selectedVideo]);

    // Attach local stream (SMALL)
    useEffect(() => {

        const video = document.getElementById("small-local-video");

        if (video && localStream && selectedVideo !== "local") {
            video.srcObject = localStream;
        }

    }, [localStream, selectedVideo]);


    // ================= FULLSCREEN ENTER =================
    const enterFullScreen = async () => {

        if (mainContainerRef.current) {

            if (mainContainerRef.current.requestFullscreen) {
                await mainContainerRef.current.requestFullscreen();
            }

            setIsFullScreen(true);
        }
    };


    // ================= FULLSCREEN EXIT =================
    const exitFullScreen = async () => {

        if (document.fullscreenElement) {
            await document.exitFullscreen();
        }

        setIsFullScreen(false);
    };


    return (
        <div className="videoWrapper">

            {/* ================= MAIN VIDEO ================= */}
            <div
                className="localBlock"
                ref={mainContainerRef}
            >

                <Paper className="videoCard localCard">

                    {/* HEADER */}
                    <div className="videoHeader" style={{ position: "relative" }}>

                        <Typography className="videoUsername">
                            {selectedVideo === "local"
                                ? "You"
                                : selectedRemote?.userId || "Unknown"}
                        </Typography>

                        {/* FULLSCREEN BUTTON */}
                        <IconButton
                            onClick={enterFullScreen}
                            style={{ color: "white", marginLeft: "auto" }}
                        >
                            <FullscreenIcon />
                        </IconButton>

                        {/* EXIT BUTTON */}
                        {isFullScreen && (
                            <IconButton
                                onClick={exitFullScreen}
                                style={{
                                    color: "white",
                                    position: "absolute",
                                    right: 10,
                                    top: 10,
                                    zIndex: 9999,
                                    background: "rgba(0,0,0,0.5)"
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}

                    </div>

                    {/* VIDEO AREA */}
                    {selectedVideo === "local" ? (
                        <video
                            id="main-local-video"
                            autoPlay
                            playsInline
                            muted
                            className="localVideo"
                        />
                    ) : (
                        <VideoPlayer stream={selectedRemote?.stream} />
                    )}

                </Paper>
            </div>


            {/* ================= THUMBNAILS ================= */}
            <div className="remoteRow">

                {/* LOCAL SMALL */}
                {selectedVideo !== "local" && (
                    <div
                        className="remoteItem"
                        onClick={() => setSelectedVideo("local")}
                    >
                        <Paper className="videoCard">
                            <Typography className="remoteUserName">You</Typography>

                            <video
                                id="small-local-video"
                                autoPlay
                                playsInline
                                muted
                                className="localVideo"
                            />
                        </Paper>
                    </div>
                )}

                {/* REMOTE USERS */}
                {remoteStreams
                    .filter((item) => item.socketId !== selectedVideo)
                    .map((item) => (
                        <div
                            key={item.socketId}
                            className="remoteItem"
                            onClick={() => setSelectedVideo(item.socketId)}
                        >
                            <Paper className="videoCard">
                                <Typography className="remoteUserName">
                                    {item.userId || "Unknown"}
                                </Typography>

                                <VideoPlayer stream={item.stream} />
                            </Paper>
                        </div>
                    ))}
            </div>

        </div>
    );
};

export default VideoGrid;