const events = require("./events");

const messageService = require("../services/message.service");

const { emitError } = require("./socket.utils");

module.exports = (io, socket) => {
  socket.on(events.SEND_MESSAGE, async ({ roomId, content }) => {
    try {
      const message = await messageService.sendMessage(
        roomId,
        socket.user.userId,
        content,
      );
      
      io.to(roomId).emit(events.RECEIVE_MESSAGE, message);
    } catch (err) {
      emitError(socket, err.message, err.statusCode);
    }
  });
};
