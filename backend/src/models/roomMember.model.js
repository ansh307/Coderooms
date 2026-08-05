const mongoose = require("mongoose");

const roomMemberSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      default: "member",
    },

    status: {
      type: String,
      enum: ["active", "left", "banned"],
      default: "active",
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },

    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

roomMemberSchema.index(
  {
    room: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "RoomMember",
  roomMemberSchema
);