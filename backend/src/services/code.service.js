const mongoose = require("mongoose");

const Code = require("../models/code.model");
const Room = require("../models/room.model");

const roomMemberService = require("./roomMember.service");
const ApiError = require("../utils/ApiError");

const initializeCode = async (
  roomId,
  language = "javascript",
  session = null,
) => {
  const [code] = await Code.create(
    [
      {
        room: roomId,
        language,
        content: "",
      },
    ],
    {
      session,
    },
  );

  return code;
};

const getCode = async (roomId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const roomExists = await Room.exists({ _id: roomId });

  if (!roomExists) {
    throw new ApiError(404, "Room not found.");
  }

  const isMember = await roomMemberService.isMember(roomId, userId);

  if (!isMember) {
    throw new ApiError(403, "You are not a member of this room.");
  }

  const code = await Code.findOne({
    room: roomId,
  });

  if (!code) {
    throw new ApiError(404, "Code document not found.");
  }

  return code;
};

const saveCode = async (roomId, userId, { content, language }) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const isMember = await roomMemberService.isMember(roomId, userId);

  if (!isMember) {
    throw new ApiError(403, "You are not a member of this room.");
  }

  const code = await Code.findOneAndUpdate(
    {
      room: roomId,
    },
    {
      content,
      language,
      updatedBy: userId,
      $inc: {
        version: 1,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!code) {
    throw new ApiError(404, "Code document not found.");
  }

  return code;
};

const updateCodeContent = async (
  roomId,
  userId,
  content
) => {
  const isMember = await roomMemberService.isMember(
    roomId,
    userId
  );

  if (!isMember) {
    throw new ApiError(
      403,
      "You are not a member of this room."
    );
  }

  return await Code.findOneAndUpdate(
    {
      room: roomId,
    },
    {
      content,
      updatedBy: userId,
      $inc: {
        version: 1,
      },
    },
    {
     returnDocument: "after",
    }
  );
};

module.exports = {
  initializeCode,
  getCode,
  saveCode,
  updateCodeContent
};
