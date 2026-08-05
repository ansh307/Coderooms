const express = require("express");

const router = express.Router();

const messageController = require("../controllers/message.controller");

router.get(
  "/:roomId/messages",
  messageController.getMessages
);

module.exports = router;