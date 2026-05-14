import { io } from "socket.io-client";

// connect to backend
const socket = io("http://localhost:5001");

export default socket;