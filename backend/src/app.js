const express = require('express');
const cors = require("cors");
const helmet=require("helmet");
const cookieParser = require("cookie-parser");

const todoRoutes = require('./routes/todo.routes.js');
const roomRoutes = require('./routes/room.routes.js');
const roomMemberRoutes = require('./routes/roomMember.routes.js');
const messagesRoutes = require('./routes/message.route.js');
const codeRoutes = require('./routes/code.routes.js');
const authRoutes = require('./routes/auth.routes.js');

const logger = require('./config/logger.js');

const limiter = require('./middlewares/rateLimiter.js');
const errorHandler = require('./middlewares/error.middleware.js');
const metricsMiddleware = require('./middlewares/metrics.middleware.js');
const authMiddleware = require('./middlewares/auth.middleware.js');

const { client } = require('./metrics/metrics.js');

const app = express();

app.use(cors())
app.use(helmet());
app.use(express.json())
app.use(cookieParser());

app.use(metricsMiddleware);

// logger
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
  });

  next();
});

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
});

// metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use("/api/v1", limiter);
app.use("/api/v1/todo", authMiddleware, todoRoutes)
app.use("/api/v1/room", authMiddleware, roomRoutes)
app.use("/api/v1/roomMember", authMiddleware, roomMemberRoutes)
app.use("/api/v1/rooms", authMiddleware, messagesRoutes)
app.use("/api/v1/rooms", authMiddleware, codeRoutes)
app.use("/api/v1/auth", authRoutes)

// Global Error Handler
app.use(errorHandler);

module.exports = app;