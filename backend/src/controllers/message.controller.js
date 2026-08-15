const messageService = require("../services/message.service");

const getMessages = async (req, res) => {
  try {
    const messages = await messageService.getMessages(
      req.params.roomId,
      req.query.page,
      req.query.limit,
      userId = req.user._id,
    );

    return res.json({
      success: true,
      data: messages,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getMessages,
};
