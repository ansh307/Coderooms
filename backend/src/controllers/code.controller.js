const codeService = require("../services/code.service");
const RoomMember = require("../models/roomMember.model");
const codeExecutionService = require("../services/codeExecution.service");

const getCode = async (req, res) => {
  try {
    const code = await codeService.getCode(
      req.params.roomId,
      req.user._id
    );

    return res.status(200).json({
      success: true,
      data: code,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const saveCode = async (req, res) => {
  try {
    const code = await codeService.saveCode(
      req.params.roomId,
      req.user._id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Code saved successfully.",
      data: code,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};


const executeCode = async (req, res) => {
  try {
    const {
      roomId,
      language,
      code,
      stdin = "",
    } = req.body;

    if (!roomId) {
      return res.status(400).json({
        success: false,
        message: "Room id is required.",
      });
    }

    /*
     * Verify active membership
     */

    const member = await RoomMember.findOne({
      room: roomId,
      user: req.user._id,
      status: "active",
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message:
          "You must be an active member of this room.",
      });
    }

    /*
     * Execute
     */

    const result =
      await codeExecutionService.execute({
        language,
        code,
        stdin,
      });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(
      "Code execution error:",
      err,
    );

    return res.status(
      err.statusCode || 500,
    ).json({
      success: false,
      message:
        err.message ||
        "Code execution failed.",
    });
  }
};

module.exports = {
  getCode,
  saveCode,
  executeCode
};