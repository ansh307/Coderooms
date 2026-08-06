const events = require("./events");

const codeService = require("../services/code.service");
const persistence = require("./code.persistence");

const { emitError } = require("./socket.utils");

module.exports = (io, socket) => {
  socket.on(events.LOAD_CODE, async ({ roomId }) => {
    try {
      const code = await persistence.getLatestCode(roomId, socket.user.userId);

      socket.emit(events.CODE_LOADED, code);
    } catch (err) {
      emitError(socket, err.message, err.statusCode);
    }
  });

  socket.on(
    events.CODE_CHANGE,
    async ({ roomId, content, language, version, updatedBy }) => {
      try {
        persistence.scheduleSave(roomId, {
          room: roomId,
          content,
          language,
          version,
          updatedBy,
          updatedAt: new Date(),
        });

        socket.to(roomId).emit(events.CODE_UPDATED, {
          roomId,
          content,
        });
      } catch (err) {
        emitError(socket, err.message, err.statusCode);
      }
    },
  );
};
