export const toggleAudio = (localStream,setIsMuted) => {

    localStream.current
        .getAudioTracks()
        .forEach((track) => {
            track.enabled = !track.enabled;
        });

    setIsMuted((prev) => !prev);
};



export const toggleVideo = (localStream,setIsVideoOff) => {

    localStream.current
        .getVideoTracks()
        .forEach((track) => {

            track.enabled =
                !track.enabled;
        });

    setIsVideoOff((prev) => !prev);
};