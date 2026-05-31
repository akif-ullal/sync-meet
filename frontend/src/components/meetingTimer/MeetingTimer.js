import useMeetingTimer
from "../../hooks/useMeetingTimer";

import formatTime
from "../../utils/formatTime";

const MeetingTimer = () => {

    const seconds =
        useMeetingTimer();

    return (

        <h2>
            Meeting Time:
            {
                formatTime(seconds)
            }
        </h2>
    );
};

export default MeetingTimer;