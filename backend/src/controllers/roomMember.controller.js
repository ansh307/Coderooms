const roomMemberService = require("../services/roomMember.service");

const joinRoom = async (req, res) => {
  try {
    const member = await roomMemberService.joinRoom(
      req.params.roomId,
      req.user._id,
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
    await roomMemberService.leaveRoom(req.params.roomId, req.user._id);

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
      req.user._id,
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

const requestToJoin = async (req, res) => {
  try {
    const member = await roomMemberService.requestToJoin(
      req.params.roomId,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Join request submitted successfully.",
      data: member,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const approveJoinRequest = async (req, res) => {
  try {
    const member = await roomMemberService.approveJoinRequest(
      req.params.roomId,
      req.params.userId,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Join request approved.",
      data: member,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const rejectJoinRequest = async (req, res) => {
  try {
    await roomMemberService.rejectJoinRequest(
      req.params.roomId,
      req.params.userId,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Join request rejected.",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const getJoinRequests = async (req, res) => {
  try {
    const requests = await roomMemberService.getJoinRequests(
      req.params.roomId,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
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
  getRoomMembership,
  requestToJoin,
  approveJoinRequest,
  rejectJoinRequest,
  getJoinRequests,
};
