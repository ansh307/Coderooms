const mongoose = require("mongoose");

const Room = require("../models/room.model");
const RoomMember = require("../models/roomMember.model");

const ApiError = require("../utils/ApiError");

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

  // Private rooms cannot be joined directly.
  if (room.type === "private") {
    throw new ApiError(
      403,
      "This is a private room. You need approval to join.",
    );
  }

  const existingMember = await RoomMember.findOne({
    room: roomId,
    user: userId,
  }).session(session);

  if (existingMember) {
    if (existingMember.status === "active") {
      throw new ApiError(400, "You are already a member.");
    }

    if (existingMember.status === "pending") {
      throw new ApiError(400, "Your request to join this room is pending.");
    }
  }

  if (room.members.length >= room.maxUsers) {
    throw new ApiError(400, "Room is full.");
  }

  const [member] = await RoomMember.create(
    [
      {
        room: roomId,
        user: userId,
        role: "member",
        status: "active",
      },
    ],
    {
      session,
    },
  );

  await Room.findByIdAndUpdate(
    roomId,
    {
      $push: {
        members: userId,
      },
      lastActivityAt: new Date(),
    },
    {
      session,
    },
  );

  return member.populate("user", "name email");
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
      $pull: {
        members: userId,
      },
      lastActivityAt: new Date(),
    },
    {
      session,
    },
  );

  return true;
};
const getRoomMembers = async (roomId, userId) => {
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

  return RoomMember.find({
    room: roomId,
    status: "active",
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

// TODOTASK: UPDATE this to get pending status as well it is use in useRoomMembership and Invitecode page
const getRoomMembership = async (roomId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found.");
  }

  const membership = await RoomMember.findOne({
    room: roomId,
    user: userId,
  });

  return {
    isMember: membership?.status === "active",
    status: membership?.status || null,
    membership: membership || null,
  };
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

const requestToJoin = async (roomId, userId, session = null) => {
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

  if (room.type !== "private") {
    throw new ApiError(400, "This room is public. You can join directly.");
  }

  const existingMember = await RoomMember.findOne({
    room: roomId,
    user: userId,
  }).session(session);

  if (existingMember) {
    if (existingMember.status === "active") {
      throw new ApiError(400, "You are already a member.");
    }

    if (existingMember.status === "pending") {
      throw new ApiError(400, "Your join request is already pending.");
    }
  }

  if (room.members.length >= room.maxUsers) {
    throw new ApiError(400, "Room is full.");
  }

  room.joinRequests.push({
    user: userId,
    requestedAt: new Date(),
  });

  await room.save({ session });

  const [member] = await RoomMember.create(
    [
      {
        room: roomId,
        user: userId,
        role: "member",
        status: "pending",
      },
    ],
    {
      session,
    },
  );

  return member.populate("user", "username email");
};

const approveJoinRequest = async (roomId, userId, ownerId, session = null) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findOne({
    _id: roomId,
    owner: ownerId,
  }).session(session);

  if (!room) {
    throw new ApiError(404, "Room not found or you are not the owner.");
  }

  if (room.isArchived) {
    throw new ApiError(400, "Room is archived.");
  }

  if (room.members.length >= room.maxUsers) {
    throw new ApiError(400, "Room is full.");
  }

  const member = await RoomMember.findOne({
    room: roomId,
    user: userId,
    status: "pending",
  }).session(session);

  if (!member) {
    throw new ApiError(404, "Join request not found.");
  }

  member.status = "active";
  member.joinedAt = new Date();

  await member.save({ session });

  room.joinRequests = room.joinRequests.filter(
    (request) => request.user.toString() !== userId.toString(),
  );

  await room.save({ session });

  await Room.findByIdAndUpdate(
    roomId,
    {
      $addToSet: {
        members: userId,
      },
      lastActivityAt: new Date(),
    },
    {
      session,
    },
  );

  return member.populate("user", "name email");
};

const rejectJoinRequest = async (roomId, userId, ownerId, session = null) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findOne({
    _id: roomId,
    owner: ownerId,
  }).session(session);

  if (!room) {
    throw new ApiError(404, "Room not found or you are not the owner.");
  }

  room.joinRequests = room.joinRequests.filter(
    (request) => request.user.toString() !== userId.toString(),
  );

  await room.save({ session });

  const request = await RoomMember.findOneAndDelete({
    room: roomId,
    user: userId,
    status: "pending",
  }).session(session);

  if (!request) {
    throw new ApiError(404, "Join request not found.");
  }

  return true;
};

const getJoinRequests = async (roomId, ownerId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id.");
  }

  const room = await Room.findOne({
    _id: roomId,
    owner: ownerId,
  });

  if (!room) {
    throw new ApiError(404, "Room not found or you are not the owner.");
  }

  return RoomMember.find({
    room: roomId,
    status: "pending",
  })
    .populate("user", "name email")
    .sort({
      createdAt: 1,
    });
};

module.exports = {
  joinRoom,
  leaveRoom,
  getRoomMembers,
  getMembership,
  isMember,
  createOwner,
  getRoomMembership,
  requestToJoin,
  approveJoinRequest,
  rejectJoinRequest,
  getJoinRequests,
};
