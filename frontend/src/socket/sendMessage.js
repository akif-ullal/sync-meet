export const sendMessage = ({
    socketRef,
    roomId,
    message,
    setMessage
}) => {

    if (!message.trim()) {
        return;
    }

    socketRef.current.emit(
        "send-message",
        {
            roomId,
            message,
            userId: localStorage.getItem("username")
        }
    );

    setMessage("");
};