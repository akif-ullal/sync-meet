import {
    Drawer,
    Box,
    Typography,
    TextField,
    Button
} from "@mui/material";

import "../../styles/layout/chat.css";

const ChatDrawer = ({

    chatOpen,

    setChatOpen,

    chat,

    message,

    setMessage,

    sendMessage

}) => {

    return (

        <Drawer
            anchor="right"
            open={chatOpen}
            onClose={() =>
                setChatOpen(false)
            }
        >

            <Box className="chatDrawerBox">

                <Typography
                    variant="h6"
                    className="chatTitle"
                >
                    Chat
                </Typography>

                <Box className="chatMessagesBox">

                    {
                        chat.map((msg, index) => (

                            <Typography
                                key={index}
                                className="chatMessage"
                            >

                                <b>
                                    {msg.userId}:
                                </b>

                                {" "}

                                {msg.message}

                            </Typography>
                        ))
                    }

                </Box>

                <TextField
                    fullWidth
                    value={message}
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
                    placeholder="Message..."
                    className="chatInput"
                />

                <Button
                    fullWidth
                    variant="contained"
                    onClick={sendMessage}
                    className="chatButton"
                >
                    Send
                </Button>

            </Box>

        </Drawer>
    );
};

export default ChatDrawer;