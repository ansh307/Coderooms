const log = (socket, event, payload = {}) => {
  console.log(
    `[Socket] ${event}`,
    {
      socketId: socket.id,
      userId: socket.user?.userId,
      roomId: payload.roomId || null,
      timestamp: new Date().toISOString(),
    }
  );
};

module.exports = {
  log,
};