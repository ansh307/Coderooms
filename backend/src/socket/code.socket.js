const events = require("./events");

const persistence = require("./code.persistence");
const roomMemberService = require("../services/roomMember.service");

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

  socket.on(events.CODE_CHANGE, async ({ roomId, content, language }) => {
    try {
      if (!socket.joinedRooms?.has(roomId)) {
        return emitError(socket, "You must join the room first.", 403);
      }

      const isMember = await roomMemberService.isMember(
        roomId,
        socket.user.userId,
      );

      if (!isMember) {
        return emitError(socket, "You are not a member of this room.", 403);
      }

      if (typeof content !== "string") {
        return emitError(socket, "Invalid content.", 400);
      }

      if (Buffer.byteLength(content, "utf8") > 500000) {
        return emitError(socket, "Content is too large.", 400);
      }

      const latest = await persistence.scheduleSave(roomId, {
        room: roomId,
        content,
        language,
        updatedBy: socket.user.userId, // server decides
      });

      socket.to(roomId).emit(events.CODE_UPDATED, {
        roomId,
        content: latest.content,
        language: latest.language,
        version: latest.version,
        updatedAt: latest.updatedAt,
        updatedBy: latest.updatedBy,
      });
    } catch (err) {
      emitError(socket, err.message, err.statusCode);
    }
  });
};
