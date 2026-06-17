import {
    Drawer,
    Box,
    Typography,
    Button,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "../../styles/layout/inviteDrawer.css";

const InviteDrawer = ({

    inviteOpen,

    setInviteOpen,

    roomId

}) => {

    // MEETING LINK
    const meetingLink =
        `${window.location.origin}/room/${roomId}`;

    // COPY ROOM ID
    const copyRoomId = async () => {

        await navigator.clipboard.writeText(
            roomId
        );

        // alert("Meeting ID Copied");
    };

    // COPY LINK
    const copyMeetingLink = async () => {

        await navigator.clipboard.writeText(
            meetingLink
        );

        // alert("Meeting Link Copied");
    };

    return (

        <Drawer
            anchor="right"
            open={inviteOpen}
            onClose={() =>
                setInviteOpen(false)
            }
        >

            <Box className="inviteDrawer">

                {/* HEADER */}

                <Box className="inviteHeader">

                    <IconButton
                        onClick={() =>
                            setInviteOpen(false)
                        }
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6">

                        Invite Users

                    </Typography>

                </Box>


                {/* ROOM ID */}

                <Typography
                    className="inviteLabel"
                >
                    Meeting ID
                </Typography>

                <Typography
                    className="inviteValue"
                >
                    {roomId}
                </Typography>

                <Button
                    variant="contained"

                    onClick={copyRoomId}
                >
                    Copy ID
                </Button>


                {/* MEETING LINK */}

                <Typography
                    className="inviteLabel"
                >
                    Meeting Link
                </Typography>

                <Typography
                    className="inviteValue"
                >
                    {meetingLink}
                </Typography>

                <Button
                    variant="contained"

                    onClick={copyMeetingLink}
                >
                    Copy Link
                </Button>

            </Box>

        </Drawer>
    );
};

export default InviteDrawer;