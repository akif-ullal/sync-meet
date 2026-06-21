let IS_PROD = false;
const server = IS_PROD ?
    "https://syncmeetbackend-7req.onrender.com" :

    "http://localhost:5000"


export default server;