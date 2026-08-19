const express = require("express");
const router = express.Router();

const roomMemberController = require("../controllers/roomMember.controller");

router.post("/rooms/:roomId/join", roomMemberController.joinRoom);

router.post("/rooms/:roomId/leave", roomMemberController.leaveRoom);

router.get("/rooms/:roomId/members", roomMemberController.getRoomMembers);

router.get(
  "/rooms/:roomId/membership", roomMemberController.getRoomMembership,
);

// Private room
router.post(
  "/rooms/:roomId/join-request",
  roomMemberController.requestToJoin,
);

router.get(
  "/rooms/:roomId/join-requests",
  roomMemberController.getJoinRequests,
);

router.post(
  "/rooms/:roomId/join-requests/:userId/approve",
  roomMemberController.approveJoinRequest,
);

// Cannot POST /api/v1/roomMember/rooms/6a855377effa1dedc997d6bc/join-requests/6a770bf1ddb5d3eecc190721/reject
// /roomMember/rooms/${activeRoom._id}/join-requests/${userId}/reject
router.delete(
  "/rooms/:roomId/join-requests/:userId/reject",
  roomMemberController.rejectJoinRequest,
);

module.exports = router;