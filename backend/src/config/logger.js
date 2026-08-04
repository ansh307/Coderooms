const pino = require("pino");

const isDevelopment = process.env.NODE_ENV !== "production";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",

  timestamp: pino.stdTimeFunctions.isoTime,

  base: {
    pid: process.pid,
    environment: process.env.NODE_ENV,
  },

  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "confirmPassword",
      "token",
      "accessToken",
      "refreshToken",
      "apiKey",
    ],
    censor: "[REDACTED]",
  },

  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

module.exports = logger;