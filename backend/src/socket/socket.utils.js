const events = require("./events");

const emitError = (socket, message, statusCode = 400) => {
  socket.emit(events.ERROR, {
    success: false,
    statusCode,
    message,
  });
};

const emitSuccess = (socket, event, data = {}) => {
  socket.emit(event, {
    success: true,
    ...data,
  });
};

module.exports = {
  emitError,
  emitSuccess,
};