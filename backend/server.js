require("dotenv").config();

const http = require("http");

const app = require("./src/app");
const connectDB = require("./src/db/db");
const logger = require("./src/config/logger");
const initializeSocket = require("./src/socket");
const persistence = require("./src/socket/code.persistence");

connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

process.on("uncaughtException", (error) => {
  logger.fatal(
    {
      err: error,
    },
    "Uncaught exception",
  );

  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.fatal(
    {
      err: error,
    },
    "Unhandled promise rejection",
  );

  process.exit(1);
});

process.on("SIGINT", async () => {
  console.log("Flushing code cache...");

  await persistence.flushAll();

  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Flushing code cache...");

  await persistence.flushAll();

  process.exit(0);
});

// Start HTTP server
server.listen(PORT, () => {
  logger.info(
    {
      port: PORT,
      environment: process.env.NODE_ENV,
    },
    "Server started",
  );
});

module.exports = server;
