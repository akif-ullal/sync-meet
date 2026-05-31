import {
    Box,
    IconButton
} from "@mui/material";

import MicIcon
from "@mui/icons-material/Mic";

import MicOffIcon
from "@mui/icons-material/MicOff";

import VideocamIcon
from "@mui/icons-material/Videocam";

import VideocamOffIcon
from "@mui/icons-material/VideocamOff";

import ScreenShareIcon
from "@mui/icons-material/ScreenShare";

import CallEndIcon
from "@mui/icons-material/CallEnd";

import ChatIcon
from "@mui/icons-material/Chat";

import GroupsIcon
from "@mui/icons-material/Groups";

import PersonAddIcon
from "@mui/icons-material/PersonAdd";

import "../../styles/layout/controlBar.css";

const ControlBar = ({

    isMuted,

    isVideoOff,

    isScreenSharing,

    toggleAudio,

    toggleVideo,

    shareScreen,

    stopScreenSharing,

    leaveMeeting,

    openChat,

    openParticipants,

    openInvite

}) => {

    return (

        <Box className="controlBar">

            {/* INVITE */}
            <IconButton
                onClick={openInvite}
                sx={{
                    background: "white"
                }}
                className="controlButton"
            >

                <PersonAddIcon />

            </IconButton>

            {/* MIC */}

            <IconButton
                onClick={toggleAudio}
                className="controlButton"
            >

                {
                    isMuted
                        ? <MicOffIcon />
                        : <MicIcon />
                }

            </IconButton>

            {/* VIDEO */}

            <IconButton
                onClick={toggleVideo}
                className="controlButton"
            >

                {
                    isVideoOff
                        ? <VideocamOffIcon />
                        : <VideocamIcon />
                }

            </IconButton>

            {/* SCREEN SHARE */}

            <IconButton
                onClick={
                    isScreenSharing
                        ? stopScreenSharing
                        : shareScreen
                }
                className="controlButton"
            >

                <ScreenShareIcon />

            </IconButton>

            {/* CHAT */}

            <IconButton
                onClick={openChat}
                className="controlButton"
            >

                <ChatIcon />

            </IconButton>

            {/* PARTICIPANTS */}

            <IconButton
                onClick={openParticipants}
                className="controlButton"
            >

                <GroupsIcon />

            </IconButton>

            {/* LEAVE */}

            <IconButton
                onClick={leaveMeeting}
                className="leaveButton"
            >

                <CallEndIcon />

            </IconButton>

        </Box>
    );
};

export default ControlBar;