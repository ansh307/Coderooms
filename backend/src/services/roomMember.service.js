const mongoose = require("mongoose");

const Room = require("../models/room.model");
const RoomMember = require("../models/roomMember.model");

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const joinRoom = async (roomId, userId, session = null) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findById(roomId).session(session);

  if (!room) {
    throw new ApiError(404, "Room not found.");
  }

  if (room.isArchived) {
    throw new ApiError(400, "Room is archived.");
  }

  const existingMember = await RoomMember.findOne({
    room: roomId,
    user: userId,
  }).session(session);

  if (existingMember) {
    throw new ApiError(400, "You are already a member.");
  }

  const [member] = await RoomMember.create(
    [
      {
        room: roomId,
        user: userId,
        role: "member",
      },
    ],
    {
      session,
    },
  );

  await Room.findByIdAndUpdate(
    roomId,
    {
      $inc: {
        activeUsers: 1,
      },
      lastActivityAt: new Date(),
    },
    {
      session,
    },
  );

  return member.populate("user", "username email");
};

const leaveRoom = async (roomId, userId, session = null) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const member = await RoomMember.findOneAndDelete({
    room: roomId,
    user: userId,
  }).session(session);

  if (!member) {
    throw new ApiError(404, "You are not a member of this room.");
  }

  await Room.findByIdAndUpdate(
    roomId,
    {
      $inc: {
        activeUsers: -1,
      },
      lastActivityAt: new Date(),
    },
    {
      session,
    },
  );

  return true;
};
const getRoomMembers = async (roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found.");
  }

  return RoomMember.find({
    room: roomId,
  })
    .populate("user", "name")
    .sort({
      joinedAt: 1,
    });
};

const getMembership = async (roomId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  return await RoomMember.findOne({
    room: roomId,
    user: userId,
  });
};

const isMember = async (roomId, userId) => {
  const membership = await getMembership(roomId, userId);
  return !!membership;
};

const createOwner = async (roomId, userId, session = null) => {
  const [member] = await RoomMember.create(
    [
      {
        room: roomId,
        user: userId,
        role: "owner",
      },
    ],
    {
      session,
    },
  );

  await Room.findByIdAndUpdate(
    roomId,
    {
      $inc: {
        activeUsers: 1,
      },
      lastActivityAt: new Date(),
    },
    {
      session,
    },
  );

  return member;
};

module.exports = {
  joinRoom,
  leaveRoom,
  getRoomMembers,
  getMembership,
  isMember,
  createOwner,
};
