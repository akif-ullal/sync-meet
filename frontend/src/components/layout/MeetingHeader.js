import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from "@mui/material";

import "../../styles/layout/meetingHeader.css";

import MeetingTimer from "../meetingTimer/MeetingTimer";

import VideoChatIcon from "@mui/icons-material/VideoChat";

const MeetingHeader = () => {

  return (

    <AppBar
      position="fixed"
      className="meetingHeader"
    >

      <Toolbar
        className="meetingHeaderToolbar"
      >

        {/* LOGO */}

        <Box className="logo">

          <Box className="logo-icon-container">

            <VideoChatIcon
              className="logo-icon"
            />

          </Box>

          <Typography
            variant="h6"
            className="logo-text"
          >

            SyncMeet

          </Typography>

        </Box>


        {/* TIMER */}

        <Box className="timerContainer">

          <MeetingTimer />

        </Box>

      </Toolbar>

    </AppBar>

  );
};

export default MeetingHeader;