const roomService = require("../services/room.service");
const roomMemberService = require("../services/roomMember.service");

const presence = require("./presence.socket");
const events = require("./events");

const { emitError } = require("./socket.utils");
const logger = require("./socket.logger");

const joinRoom = async (io, socket, roomId) => {
  try {
    await roomService.getRoomById(roomId);

    const isMember = await roomMemberService.isMember(
      roomId,
      socket.user.userId
    );

    if (!isMember) {
      return emitError(socket, "You are not a member of this room.", 403);
    }

    if (socket.joinedRooms.has(roomId)) {
      return;
    }

    socket.join(roomId);

    socket.joinedRooms.add(roomId);

    presence.addUser(roomId, socket);

    logger.log(socket, "JOIN_ROOM", {
      roomId,
    });

    io.to(roomId).emit(events.USER_JOINED, {
      userId: socket.user.userId,
      username: socket.user.name,
    });

    io.to(roomId).emit(
      events.ONLINE_USERS,
      presence.getUsers(roomId)
    );
  } catch (err) {
    emitError(socket, err.message);
  }
};

const leaveRoom = (io, socket, roomId) => {
  if (!socket.joinedRooms.has(roomId)) return;

  socket.leave(roomId);

  socket.joinedRooms.delete(roomId);

  presence.removeUser(roomId, socket.user.userId);

  logger.log(socket, "LEAVE_ROOM", {
    roomId,
  });

  io.to(roomId).emit(events.USER_LEFT, {
    userId: socket.user.userId,
    username: socket.user.name,
  });

  io.to(roomId).emit(
    events.ONLINE_USERS,
    presence.getUsers(roomId)
  );
};


const disconnect = (io, socket) => {
  for (const roomId of socket.joinedRooms) {
    presence.removeUser(roomId, socket.user.userId);

    logger.log(socket, "DISCONNECT", {
      roomId,
    });

    io.to(roomId).emit(events.USER_LEFT, {
      userId: socket.user.userId,
      username: socket.user.name,
    });

    io.to(roomId).emit(
      events.ONLINE_USERS,
      presence.getUsers(roomId)
    );
  }

  socket.joinedRooms.clear();
};

module.exports = {
  joinRoom,
  leaveRoom,
  disconnect,
};