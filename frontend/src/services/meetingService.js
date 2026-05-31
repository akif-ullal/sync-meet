import axios from "axios";
import server from "../environment";

export const endMeeting =
    async (roomId) => {

        try {

            await axios.post(
                `${server}/api/meeting/end`,
                { roomId }
            );

        } catch (error) {

            console.log(error);
        }
    };