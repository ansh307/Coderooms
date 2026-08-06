const express = require("express");

const router = express.Router();

const codeController = require("../controllers/code.controller");

router.get(
  "/:roomId/get-code",
  codeController.getCode
);

router.put(
  "/:roomId/save-code",
  codeController.saveCode
);

module.exports = router;