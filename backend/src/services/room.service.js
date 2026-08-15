const mongoose = require("mongoose");
const Room = require("../models/room.model");
const roomMemberService = require("./roomMember.service");
const codeService = require("./code.service");
const Message = require("../models/message.model");
const Code = require("../models/code.model");
const RoomMember = require("../models/roomMember.model");

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "go",
  "rust",
];

const createRoom = async (data, user) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
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

    const [room] = await Room.create(
      [
        {
          name: name.trim(),
          description: description?.trim() || "",
          type,
          language,
          maxUsers,
          owner: user._id,
          members: [user._id],
        },
      ],
      { session },
    );

    await roomMemberService.createOwner(room._id, user._id, session);

    await codeService.initializeCode(room._id, room.language, session);

    await session.commitTransaction();

    return await Room.findById(room._id).populate("owner", "username email");
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const getRooms = async ({ userId, type, language }) => {
  const filter = {
    isArchived: false,
  };

  if (type) filter.type = type;
  if (language) filter.language = language;

  const rooms = await Room.find(filter).populate("owner", "name email").sort({
    lastActivityAt: -1,
  });

  const publicRooms = [];
  const myRooms = [];
  const joinedRooms = [];

  for (const room of rooms) {
    const isOwner = room.owner?._id?.toString() === userId.toString();

    const isMember = room.members?.some(
      (memberId) => memberId.toString() === userId.toString(),
    );

    /*
     * System-created public rooms
     */
    if (room.type === "public" && !isOwner && !isMember) {
      publicRooms.push(room);
      continue;
    }

    /*
     * Rooms created by current user
     */
    if (isOwner) {
      myRooms.push(room);
      continue;
    }

    /*
     * Rooms created by someone else
     * that current user joined
     */
    if (isMember) {
      joinedRooms.push(room);
    }
  }

  return {
    publicRooms,
    myRooms,
    joinedRooms,
    rooms
  };
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

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      update[field] = data[field];
    }
  }

  if (update.name !== undefined && update.name.trim().length < 3) {
    throw new ApiError(400, "Room name must be at least 3 characters.");
  }

  if (update.description !== undefined) {
    update.description = update.description.trim();
  }

  if (update.name !== undefined) {
    update.name = update.name.trim();
  }

  if (
    update.maxUsers !== undefined &&
    (update.maxUsers < 2 || update.maxUsers > 100)
  ) {
    throw new ApiError(400, "Maximum users must be between 2 and 100.");
  }

  if (update.language && !SUPPORTED_LANGUAGES.includes(update.language)) {
    throw new ApiError(400, "Unsupported language.");
  }

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const room = await Room.findOneAndUpdate(
      {
        _id: roomId,
        owner: user._id,
      },
      update,
      {
        new: true,
        runValidators: true,
        session,
      },
    ).populate("owner", "username email");

    if (!room) {
      throw new ApiError(404, "Room not found or you are not the owner.");
    }

    if (update.language) {
      await Code.updateOne(
        {
          room: roomId,
        },
        {
          language: update.language,
        },
        {
          session,
        },
      );
    }

    await session.commitTransaction();

    return room;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
const deleteRoom = async (roomId, user) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const room = await Room.findOneAndDelete({
      _id: roomId,
      owner: user._id,
    }).session(session);

    if (!room) {
      throw new ApiError(404, "Room not found or you are not the owner.");
    }

    await RoomMember.deleteMany(
      {
        room: roomId,
      },
      { session },
    );

    await Code.deleteOne(
      {
        room: roomId,
      },
      { session },
    );

    await Message.deleteMany(
      {
        room: roomId,
      },
      { session },
    );

    // Future
    //
    // await Snapshot.deleteMany(...)
    // await File.deleteMany(...)
    // await Permission.deleteMany(...)

    await session.commitTransaction();

    return true;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
