const mongoose = require("mongoose");
const roomMemberService = require("./roomMember.service");
const Message = require("../models/message.model");

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

const getMessages = async (roomId, page = 1, limit = 30) => {
  page = Number(page);
  limit = Number(limit);

  return Message.find({
    room: roomId,
  })
    .populate("sender", "name username avatar")
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
