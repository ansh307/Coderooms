const mongoose = require("mongoose");
const Room = require("../models/room.model");

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createRoom = async (data, user) => {
  const {
    name,
    description,
    type = "private",
    language = "javascript",
    maxUsers = 20,
  } = data;

  if (!name || name.trim().length < 3) {
    throw new ApiError(400, "Room name must be at least 3 characters.");
  }

  if (maxUsers < 2 || maxUsers > 100) {
    throw new ApiError(400, "Maximum users must be between 2 and 100.");
  }

  const room = await Room.create({
    name: name.trim(),
    description: description?.trim() || "",
    type,
    language,
    maxUsers,
    owner: user._id,
  });

  return room.populate("owner", "username email");
};

const getRooms = async ({ type, language }) => {
  const filter = {
    isArchived: false,
  };

  if (type) filter.type = type;

  if (language) filter.language = language;

  return Room.find(filter).populate("owner", "username email avatar").sort({
    lastActivityAt: -1,
  });
};

const getRoomById = async (roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findById(roomId).populate(
    "owner",
    "username email avatar",
  );

  if (!room) {
    throw new ApiError(404, "Room not found.");
  }

  return room;
};

const updateRoom = async (roomId, data, user) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const allowedFields = [
    "name",
    "description",
    "language",
    "type",
    "maxUsers",
    "isArchived",
  ];

  const update = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      update[field] = data[field];
    }
  });

  const room = await Room.findOneAndUpdate(
    {
      _id: roomId,
      owner: user._id,
    },
    update,
    {
      new: true,
      runValidators: true,
    },
  ).populate("owner", "username email");

  if (!room) {
    throw new ApiError(404, "Room not found or you are not the owner.");
  }

  return room;
};

const deleteRoom = async (roomId, user) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findOneAndDelete({
    _id: roomId,
    owner: user._id,
  });

  if (!room) {
    throw new ApiError(404, "Room not found or you are not the owner.");
  }

  return true;
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
