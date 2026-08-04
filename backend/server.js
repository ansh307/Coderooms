require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const logger = require("./src/config/logger");

connectDB();

const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  // console.log("Server is running locally on port " + PORT);
  logger.info(
  {
    port: PORT,
    environment: process.env.NODE_ENV,
  },
  "Server started"
);
});



module.exports = app;
