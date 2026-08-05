const mongoose = require("mongoose");

const Room = require("../models/room.model");
const RoomMember = require("../models/roomMember.model");

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}


const joinRoom = async (roomId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found.");
  }

  if (room.isArchived) {
    throw new ApiError(400, "Room is archived.");
  }

  const existingMember = await RoomMember.findOne({
    room: roomId,
    user: userId,
  });

  if (existingMember) {
    throw new ApiError(400, "You are already a member.");
  }

  const member = await RoomMember.create({
    room: roomId,
    user: userId,
    role: "member",
  });

  await Room.findByIdAndUpdate(roomId, {
    $inc: {
      activeUsers: 1,
    },
    lastActivityAt: new Date(),
  });

  return member.populate("user", "username email");
};

const leaveRoom = async (roomId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const member = await RoomMember.findOneAndDelete({
    room: roomId,
    user: userId,
  });

  if (!member) {
    throw new ApiError(404, "You are not a member of this room.");
  }

  await Room.findByIdAndUpdate(roomId, {
    $inc: {
      activeUsers: -1,
    },
    lastActivityAt: new Date(),
  });

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
    .populate("user", "username avatar")
    .sort({
      joinedAt: 1,
    });
};


module.exports = {
  joinRoom,
  leaveRoom,
  getRoomMembers,
};