const express = require("express");
const router = express.Router();

const roomMemberController = require("../controllers/roomMember.controller");

router.post("/rooms/:roomId/join", roomMemberController.joinRoom);

router.post("/rooms/:roomId/leave", roomMemberController.leaveRoom);

router.get("/rooms/:roomId/members", roomMemberController.getRoomMembers);

router.get(
  "/rooms/:roomId/membership", roomMemberController.getRoomMembership,
);

module.exports = router;