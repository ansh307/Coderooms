const events = require("./events");

const socketService = require("./socket.service");

module.exports = (io, socket) => {
  socket.joinedRooms = new Set();

  socket.on(events.JOIN_ROOM, async({ roomId }) =>
    socketService.joinRoom(io, socket, roomId)
  );

  socket.on(events.LEAVE_ROOM, async({ roomId }) =>
    socketService.leaveRoom(io, socket, roomId)
  );

  socket.on("disconnect", async() =>
    socketService.disconnect(io, socket)
  );
};