const roomMemberService = require("../services/roomMember.service");

const joinRoom = async (req, res) => {
  try {
    const member = await roomMemberService.joinRoom(
      req.params.roomId,
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: "Joined room successfully.",
      data: member,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const leaveRoom = async (req, res) => {
  try {
    await roomMemberService.leaveRoom(
      req.params.roomId,
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: "Left room successfully.",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const getRoomMembers = async (req, res) => {
  try {
    const members = await roomMemberService.getRoomMembers(
      req.params.roomId,
      userId = req.user._id,
    );

    return res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const getRoomMembership = async (req, res) => {
  try {
    const result = await roomMemberService.getRoomMembership(
      req.params.roomId,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  joinRoom,
  leaveRoom,
  getRoomMembers,
  getRoomMembership
};