import {
    Drawer,
    Box,
    Typography
} from "@mui/material";

import "../../styles/layout/participantsDrawer.css";

const ParticipantsDrawer = ({

    participantsOpen,

    setParticipantsOpen,

    participants,


}) => {

    return (

        <Drawer
            anchor="left"
            open={participantsOpen}
            onClose={() =>
                setParticipantsOpen(false)
            }
        >

            <Box
                className="participantsDrawerBox"
            >

                <Typography
                    variant="h6"
                    className="participantsTitle"
                >
                    Participants
                </Typography>

                {
                    participants.map(
                        (user) => (

                            <Typography
                                key={user.socketId}
                                className="participantItem"
                            >

                                {user.userId}

                            </Typography>
                        )
                    )
                }

            </Box>

        </Drawer>
    );
};

export default ParticipantsDrawer;