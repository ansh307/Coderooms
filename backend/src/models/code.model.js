const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      unique: true,
      index: true,
    },

    language: {
      type: String,
      default: "javascript",
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    version: {
      type: Number,
      default: 1,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Code", codeSchema);