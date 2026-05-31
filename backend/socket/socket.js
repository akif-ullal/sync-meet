import registerChatSocket from "./chatSocket.js";

const rooms = {};

const socketHandler = (io) => {

    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id);

        // =========================
        // JOIN ROOM
        // =========================
        socket.on("join-room", ({ roomId, userId }) => {

            console.log("JOIN RECEIVED:", userId);

            socket.roomId = roomId;
            socket.userId = userId;

            socket.join(roomId);

            // init room
            if (!rooms[roomId]) {
                rooms[roomId] = [];
            }

            // add user
            rooms[roomId] = rooms[roomId].filter(
                 (u) => u.socketId !== socket.id 
                ); 
            
            
            rooms[roomId].push({ 
                userId: socket.userId, 
                socketId: socket.id
             });

            console.log(`${userId} joined ${roomId}`);

            // send updated list to everyone
            io.to(roomId).emit("room-users", rooms[roomId]);

            // notify existing users for WebRTC
            socket.to(roomId).emit("user-joined", {
                userId,
                socketId: socket.id
            });
        });


        // =========================
        // WEBRTC SIGNALING
        // =========================
        socket.on("offer", ({ offer, to }) => {
            io.to(to).emit("offer", {
                offer,
                from: socket.id,
                userId: socket.userId
            });
        });

        socket.on("answer", ({ answer, to }) => {
            io.to(to).emit("answer", {
                answer,
                from: socket.id
            });
        });

        socket.on("ice-candidate", ({ candidate, to }) => {
            io.to(to).emit("ice-candidate", {
                candidate,
                from: socket.id
            });
        });


        // =========================
        // CHAT SOCKET
        // =========================
        registerChatSocket(io, socket);

        socket.on("check-room", ({ roomId }, callback) => {

            const room = io.sockets.adapter.rooms.get(roomId);

            if (room && room.size > 0) {

                callback({
                    exists: true
                });

            } else {

                callback({
                    exists: false
                });
            }
        });


        // =========================
        // LEAVE MEETING (manual exit)
        // =========================
        socket.on("leave-meeting", () => {

            const roomId = socket.roomId;

            if (roomId && rooms[roomId]) {

                rooms[roomId] = rooms[roomId].filter(
                    (u) => u.socketId !== socket.id
                );

                io.to(roomId).emit("room-users", rooms[roomId]);

                socket.to(roomId).emit("user-disconnected", {
                    socketId: socket.id
                });

                if (rooms[roomId].length === 0) {
                    delete rooms[roomId];
                }
            }
        });


        // =========================
        // DISCONNECT (tab close / crash)
        // =========================
        socket.on("disconnect", () => {

            const roomId = socket.roomId;

            console.log("User Disconnected:", socket.id);

            if (roomId && rooms[roomId]) {

                rooms[roomId] = rooms[roomId].filter(
                    (u) => u.socketId !== socket.id
                );

                io.to(roomId).emit("room-users", rooms[roomId]);

                socket.to(roomId).emit("user-disconnected", {
                    socketId: socket.id
                });

                if (rooms[roomId].length === 0) {
                    delete rooms[roomId];
                }
            }
        });

    });
};

export default socketHandler;