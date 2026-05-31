import {
    useEffect,
    useRef,
    useState
} from "react";

import { io } from "socket.io-client";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    Box
} from "@mui/material";


// SOCKETS
import {
    registerSocketEvents
} from "../socket/socketHandlers";

import {
    registerChatEvents
} from "../socket/chatHandlers";

import {
    sendMessage
} from "../socket/sendMessage";


// WEBRTC
import {
    toggleAudio,
    toggleVideo
} from "../webrtc/mediaControls";

import {
    shareScreen,
    stopScreenSharing
} from "../webrtc/screenShare";

import {
    leaveMeeting
} from "../webrtc/leaveMeeting";


// LAYOUT COMPONENTS
import MeetingHeader
from "../components/layout/MeetingHeader";

import VideoGrid
from "../components/layout/VideoGrid";

import ControlBar
from "../components/layout/ControlBar";

import ChatDrawer
from "../components/layout/ChatDrawer";

import ParticipantsDrawer
from "../components/layout/ParticipantsDrawer";

import InviteDrawer
from "../components/layout/InviteDrawer";

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


    // ================= LOCAL STREAM STATE =================

    const [localMediaStream, setLocalMediaStream] =
        useState(null);


    // ================= VIDEO STATES =================

    const [remoteStreams, setRemoteStreams] =
        useState([]);

    const [isMuted, setIsMuted] =
        useState(false);

    const [isVideoOff, setIsVideoOff] =
        useState(false);

    const [isScreenSharing, setIsScreenSharing] =
        useState(false);


    // ================= CHAT STATES =================

    const [message, setMessage] =
        useState("");

    const [chat, setChat] =
        useState([]);


    // ================= PARTICIPANTS =================

    const [participants, setParticipants] =
        useState([]);


    // ================= DRAWERS =================

    const [chatOpen, setChatOpen] =
        useState(false);

    const [participantsOpen, setParticipantsOpen] =
        useState(false);

    const [inviteOpen, setInviteOpen] =
        useState(false);


    // ================= WEBRTC SERVERS =================

    const servers = {
        iceServers: [
            {
                urls:
                    "stun:stun.l.google.com:19302"
            }
        ]
    };


    // ================= INITIAL CONNECTION =================

    useEffect(() => {

        socketRef.current =
            io(server);


        socketRef.current.on(
            "connect",
            async () => {

                console.log(
                    "Socket Connected:",
                    socketRef.current.id
                );

                await startVideo();

                joinRoom();
            }
        );


        // SOCKET EVENTS
        registerSocketEvents({

            socketRef,

            peerConnections,

            peerMeta,

            localStream,

            setRemoteStreams,

            setParticipants,

            servers
        });


        // CHAT EVENTS
        registerChatEvents({

            socketRef,

            setChat
        });


        // CLEANUP
        return () => {

            socketRef.current.disconnect();

            Object.values(
                peerConnections.current
            ).forEach((pc) => {

                pc.close();
            });
        };

    }, []);


    // ================= ATTACH VIDEO STREAM =================

    useEffect(() => {

        if (
            localVideoRef.current &&
            localMediaStream
        ) {

            localVideoRef.current.srcObject =
                localMediaStream;

            console.log(
                "Video Attached Successfully"
            );
        }

    }, [localMediaStream]);


    // ================= START CAMERA =================

    const startVideo = async () => {

        try {

            const stream =
                await navigator.mediaDevices
                    .getUserMedia({

                        video: true,

                        audio: true
                    });

            console.log(
                "LOCAL STREAM:",
                stream
            );

            localStream.current = stream;

            setLocalMediaStream(stream);

        } catch (error) {

            console.log(error);
        }
    };


    // ================= JOIN ROOM =================

    const joinRoom = () => {

        socketRef.current.emit(
            "join-room",
            {
                roomId,

                userId:
                    localStorage.getItem(
                        "username"
                    ),
            }
        );
    };


    return (

        <Box
            sx={{
                height: "100vh",
                background: "#1c1c1c",
                color: "white",
                paddingTop: "70px"
            }}
        >

            {/* ================= HEADER ================= */}

            <MeetingHeader />


            {/* ================= VIDEO GRID ================= */}

            <VideoGrid

                localStream={localMediaStream}

                remoteStreams={remoteStreams}

            />


            {/* ================= CONTROL BAR ================= */}

            <ControlBar

                isMuted={isMuted}

                isVideoOff={isVideoOff}

                isScreenSharing={
                    isScreenSharing
                }

                toggleAudio={() =>
                    toggleAudio(
                        localStream,
                        setIsMuted
                    )
                }

                toggleVideo={() =>
                    toggleVideo(
                        localStream,
                        setIsVideoOff
                    )
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

                        localStream,

                        localVideoRef,

                        peerConnections,

                        socketRef,

                        setRemoteStreams,

                        navigate
                    })
                }

                openChat={() =>
                    setChatOpen(true)
                }

                openParticipants={() =>
                    setParticipantsOpen(true)
                }

                openInvite={() =>
                    setInviteOpen(true)
                }
            />


            {/* ================= CHAT DRAWER ================= */}

            <ChatDrawer

                chatOpen={chatOpen}

                setChatOpen={setChatOpen}

                chat={chat}

                message={message}

                setMessage={setMessage}

                sendMessage={() =>
                    sendMessage({

                        socketRef,

                        roomId,

                        message,

                        setMessage
                    })
                }
            />


            {/* ================= PARTICIPANTS DRAWER ================= */}

            <ParticipantsDrawer

                participantsOpen={
                    participantsOpen
                }

                setParticipantsOpen={
                    setParticipantsOpen
                }

                participants={participants}

            />


            {/* ================= INVITE DRAWER ================= */}

            <InviteDrawer

                inviteOpen={inviteOpen}

                setInviteOpen={setInviteOpen}

                roomId={roomId}

            />

        </Box>
    );
};

export default Room;