import useMeetingTimer
from "../../hooks/useMeetingTimer";

import formatTime
from "../../utils/formatTime";

import "../../styles/layout/meetingTimer.css";

const MeetingTimer = () => {

    const seconds =
        useMeetingTimer();

    return (

        <div className="mainMeetingTimer">
            <div className="meetingTimer">

                <h2 className="meetingTimerText">

                    Meeting Time :

                    <span>

                        {formatTime(seconds)}

                    </span>

                </h2>

            </div>

        </div>

        
    );
};

export default MeetingTimer;