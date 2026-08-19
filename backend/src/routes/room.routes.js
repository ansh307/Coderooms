const router =  require('express').Router();
const roomController = require("../controllers/room.controller.js");

router.post("/create-room", roomController.createRoom);

router.get("/get-all-rooms", roomController.getRooms);

router.get("/get-room/:roomId", roomController.getRoomById);

router.get(
  "/get-room-by-invite/:inviteCode",
  roomController.getRoomByInviteCode,
);

router.patch("/update-room/:roomId", roomController.updateRoom);

router.delete("/delete-room/:roomId", roomController.deleteRoom);

module.exports = router;