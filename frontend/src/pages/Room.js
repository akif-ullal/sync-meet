import {
    useEffect,
    useRef,
    useState
} from "react";

import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

// SOCKETS
import { registerSocketEvents } from "../socket/socketHandlers";
import { registerChatEvents } from "../socket/chatHandlers";
import { sendMessage } from "../socket/sendMessage";

// WEBRTC
import { toggleAudio, toggleVideo } from "../webrtc/mediaControls";
import { shareScreen, stopScreenSharing } from "../webrtc/screenShare";
import { leaveMeeting } from "../webrtc/leaveMeeting";

// COMPONENTS
import MeetingHeader from "../components/layout/MeetingHeader";
import VideoGrid from "../components/layout/VideoGrid";
import ControlBar from "../components/layout/ControlBar";
import ChatDrawer from "../components/layout/ChatDrawer";
import ParticipantsDrawer from "../components/layout/ParticipantsDrawer";
import InviteDrawer from "../components/layout/InviteDrawer";

import server from "../environment";

const Room = () => {

    const { roomId } = useParams();
    const navigate = useNavigate();

    // ================= REFS =================
    const localVideoRef = useRef();
    const socketRef = useRef();
    const localStream = useRef();
    const peerConnections = useRef({});
    const peerMeta = useRef({});

    // ================= STATE =================
    const [localMediaStream, setLocalMediaStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]);

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const [participants, setParticipants] = useState([]);

    const [chatOpen, setChatOpen] = useState(false);
    const [participantsOpen, setParticipantsOpen] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);

    // ================= ICE SERVERS =================
    const servers = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
        ]
    };

    // ================= START VIDEO (FIXED) =================
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            console.log("LOCAL STREAM READY:", stream);

            // IMPORTANT: store immediately
            localStream.current = stream;
            setLocalMediaStream(stream);

            return stream;

        } catch (error) {
            console.log("getUserMedia error:", error);
            return null;
        }
    };

    // ================= JOIN ROOM =================
    const joinRoom = () => {
        socketRef.current.emit("join-room", {
            roomId,
            userId: localStorage.getItem("username")
        });
    };

    // ================= INIT MEDIA + JOIN (FIX) =================
    const initMediaAndJoin = async () => {

        const stream = await startVideo();

        if (!stream) {
            alert("Camera/Mic permission required");
            return;
        }

        // MOBILE FIX: force tracks active
        stream.getAudioTracks().forEach(t => t.enabled = true);
        stream.getVideoTracks().forEach(t => t.enabled = true);

        joinRoom();
    };

    // ================= SOCKET + INIT =================
    useEffect(() => {

        socketRef.current = io(server);

        socketRef.current.on("connect", async () => {
            console.log("Socket Connected:", socketRef.current.id);

            await initMediaAndJoin();
        });

        registerSocketEvents({
            socketRef,
            peerConnections,
            peerMeta,
            localStream,
            setRemoteStreams,
            setParticipants,
            servers
        });

        registerChatEvents({
            socketRef,
            setChat
        });

        return () => {

            socketRef.current.disconnect();

            Object.values(peerConnections.current).forEach(pc => pc.close());
        };

    }, []);

    // ================= ATTACH LOCAL VIDEO =================
    useEffect(() => {

        if (localVideoRef.current && localMediaStream) {
            localVideoRef.current.srcObject = localMediaStream;
        }

    }, [localMediaStream]);

    return (
        <Box sx={{
            height: "100vh",
            background: "#1c1c1c",
            color: "white",
            paddingTop: "70px"
        }}>

            <MeetingHeader />

            <VideoGrid
                localStream={localMediaStream}
                remoteStreams={remoteStreams}
            />

            <ControlBar

                isMuted={isMuted}
                isVideoOff={isVideoOff}
                isScreenSharing={isScreenSharing}

                toggleAudio={() =>
                    toggleAudio(localStream, setIsMuted)
                }

                toggleVideo={() =>
                    toggleVideo(localStream, setIsVideoOff)
                }

                shareScreen={() =>
                    shareScreen({
                        peerConnections,
                        localVideoRef,
                        localStream,
                        setIsScreenSharing
                    })
                }

                stopScreenSharing={() =>
                    stopScreenSharing({
                        peerConnections,
                        localVideoRef,
                        localStream,
                        setIsScreenSharing
                    })
                }

                leaveMeeting={() =>
                    leaveMeeting({
                        roomId,
                        localStream,
                        localVideoRef,
                        peerConnections,
                        socketRef,
                        setRemoteStreams,
                        navigate
                    })
                }

                openChat={() => setChatOpen(true)}
                openParticipants={() => setParticipantsOpen(true)}
                openInvite={() => setInviteOpen(true)}
            />

            <ChatDrawer
                chatOpen={chatOpen}
                setChatOpen={setChatOpen}
                chat={chat}
                message={message}
                setMessage={setMessage}
                sendMessage={() =>
                    sendMessage({ socketRef, roomId, message, setMessage })
                }
            />

            <ParticipantsDrawer
                participantsOpen={participantsOpen}
                setParticipantsOpen={setParticipantsOpen}
                participants={participants}
            />

            <InviteDrawer
                inviteOpen={inviteOpen}
                setInviteOpen={setInviteOpen}
                roomId={roomId}
            />

        </Box>
    );
};

export default Room;