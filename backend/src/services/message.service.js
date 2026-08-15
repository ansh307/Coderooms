const mongoose = require("mongoose");
const roomMemberService = require("./roomMember.service");
const Message = require("../models/message.model");
const Room =  require("../models/room.model");
const RoomMember = require("../models/roomMember.model");

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}


const sendMessage = async (roomId, userId, content) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room.");
  }

  const isMember = await roomMemberService.isMember(roomId, userId);

  if (!isMember) {
    throw new ApiError(403, "You are not a member of this room.");
  }
  if (!content.trim()) {
    throw new ApiError(400, "Message cannot be empty.");
  }

  const message = await Message.create({
    room: roomId,
    sender: userId,
    content,
  });

  return message.populate("sender", "name username avatar");
};

const getMessages = async (roomId, page = 1, limit = 30, userId) => {
  page = Number(page);
  limit = Number(limit);

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found.");
  }

  const isMember = await RoomMember.exists({
    room: roomId,
    user: userId,
    status: "active",
  });

  if (!isMember) {
    throw new ApiError(403, "You must join the room first.");
  }

  return Message.find({
    room: roomId,
  })
    .populate("sender", "name")
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);
};

module.exports = {
  sendMessage,
  getMessages,
};
