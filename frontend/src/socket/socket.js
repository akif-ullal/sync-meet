import { io } from "socket.io-client";
import server from "../environment";

const socket = io(server);

export default socket;