const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    joinRequests: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        requestedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },

    inviteCode: {
      type: String,
      unique: true,
      sparse: true,
    },

    language: {
      type: String,
      default: "javascript",
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    maxUsers: {
      type: Number,
      default: 20,
    },

    activeUsers: {
      type: Number,
      default: 0,
    },

    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Room", roomSchema);
