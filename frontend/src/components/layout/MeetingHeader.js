import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import "../../styles/layout/meetingHeader.css";
import MeetingTimer from "../meetingTimer/MeetingTimer";
import VideoChatIcon from "@mui/icons-material/VideoChat";

const MeetingHeader = () => {
  return (
    <AppBar position="fixed" className="meetingHeader">
      <Toolbar>

        {/* LOGO */}
        <Box display="flex" alignItems="center" gap={1} className="logo">

          <Box className="logo-icon-container">
            <VideoChatIcon className="logo-icon" />
          </Box>

          <Typography variant="h6" className="logo-text">
            SyncMeet
          </Typography>

        </Box>

        {/* PUSH TIMER TO RIGHT */}
        <Box sx={{ flexGrow: 1 }} />

        {/* TIMER */}
        <MeetingTimer />

      </Toolbar>
    </AppBar>
  );
};

export default MeetingHeader;