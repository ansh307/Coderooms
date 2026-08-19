const roomService = require("../services/room.service");

const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body, req.user);

    return res.status(201).json({
      success: true,
      message: "Room created successfully.",
      data: room,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const getRooms = async (req, res) => {
  try {
    const { publicRooms, myRooms, joinedRooms, rooms } =
      await roomService.getRooms({
        userId: req.user._id,
        type: req.query.type,
        language: req.query.language,
      });

    return res.status(200).json({
      success: true,
      data: { publicRooms, myRooms, joinedRooms, rooms },
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.roomId);

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await roomService.updateRoom(
      req.params.roomId,
      req.body,
      req.user,
    );

    return res.status(200).json({
      success: true,
      message: "Room updated successfully.",
      data: room,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    await roomService.deleteRoom(req.params.roomId, req.user);

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully.",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const getRoomByInviteCode = async (req, res) => {
  try {
    const room = await roomService.getRoomByInviteCode(req.params.inviteCode);

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomByInviteCode,
};
