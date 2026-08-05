const events = require("./events");

const socketService = require("./socket.service");

module.exports = (io, socket) => {
  socket.joinedRooms = new Set();

  socket.on(events.JOIN_ROOM, ({ roomId }) =>
    socketService.joinRoom(io, socket, roomId)
  );

  socket.on(events.LEAVE_ROOM, ({ roomId }) =>
    socketService.leaveRoom(io, socket, roomId)
  );

  socket.on("disconnect", () =>
    socketService.disconnect(io, socket)
  );
};