const mongoose = require("mongoose");
const logger = require("../config/logger");

const connectDB = async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // console.log("Database connected successfully");
    logger.info("Database connected successfully");
  } catch (e) {
    // console.error("DB connection error:", e.message);
    logger.error(e, "Database connection failed");
    process.exit(1); // exit app if DB fails
  }
};

module.exports = connectDB;
