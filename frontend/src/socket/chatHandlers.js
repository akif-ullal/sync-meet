export const registerChatEvents = ({
    socketRef,
    setChat
}) => {

    socketRef.current.on(
        "receive-message",
        (data) => {

            setChat((prev) => [
                ...prev,
                data
            ]);
        }
    );
};