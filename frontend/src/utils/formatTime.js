const formatTime = (sec) => {

    const hrs =
        Math.floor(sec / 3600);

    const min =
        Math.floor(
            (sec % 3600) / 60
        );

    const s =
        sec % 60;

    return `
        ${String(hrs).padStart(2, "0")}
        :
        ${String(min).padStart(2, "0")}
        :
        ${String(s).padStart(2, "0")}
    `;
};

export default formatTime;