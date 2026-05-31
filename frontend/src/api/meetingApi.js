import API from "./axios";

// CREATE MEETING
export const createMeeting = () => {
    return API.post("/meeting/create");
};

// JOIN MEETING
export const joinMeeting = (roomId) => {
    return API.post("/meeting/join", { roomId });
};

// END MEETING
export const endMeeting = (roomId) => {
    return API.post("/meeting/end", { roomId });
};