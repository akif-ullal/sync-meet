import Message from "../models/message.js";

const registerChatSocket = (
    io,
    socket
) => {

    socket.on(
        "send-message",
        async ({
            roomId,
            message,
            userId
        }) => {

            await Message.create({

                meetingId: roomId,

                sender: userId,

                text: message
            });

            io.to(roomId).emit(
                "receive-message",
                {
                    message,
                    userId,
                    time: new Date()
                }
            );
        }
    );
};

export default registerChatSocket;

