const rateLimit = require("express-rate-limit");
const logger = require("../config/logger");

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
  max: Number(process.env.RATE_LIMIT_MAX),
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    logger.warn(
      {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
      },
      "Rate limit exceeded"
    );

    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  },
});

module.exports = limiter;