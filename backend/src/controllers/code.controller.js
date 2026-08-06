const codeService = require("../services/code.service");

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

module.exports = {
  getCode,
  saveCode,
};