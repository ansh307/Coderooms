const { Server } = require("socket.io");

const authSocket = require("./auth.socket");
const roomSocket = require("./room.socket");

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.use(authSocket);

    io.on("connection", (socket) => {
        console.log("Socket Connected:", socket.id);

        roomSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id);
        });
    });
}

module.exports = initializeSocket;