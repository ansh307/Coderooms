const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const login = async ({ email, password }) => {
  // Validate fields
  if (!email?.trim() || !password?.trim()) {
    throw new Error("Email and password are required");
  }

  // Find user
  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check if account is active
  if (!user.isActive) {
    throw new Error("Your account has been deactivated");
  }

  // Optional: Require email verification
  // if (!user.isEmailVerified) {
  //   throw new Error("Please verify your email before logging in");
  // }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // Generate Access Token
  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // Save refresh token and login time
  user.refreshToken = hashedRefreshToken;
  user.lastLogin = new Date();

  await user.save();

  // Remove password
  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const register = async ({
  name,
  email,
  password,
  age,
  gender,
  role = "user",
}) => {
  // Validate required fields
  if (!name || !email || !password || !age || !gender) {
    throw new Error("All fields are required");
  }

  // Check if email already exists
  const existingUser = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hashedPassword,
    age,
    gender,
    role,
  });

  // Generate Access Token
  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  user.refreshToken = hashedRefreshToken;
  await user.save();

  // Remove password before returning
  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const logout = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Hash refresh token
    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return;
    }

    // Remove stored refresh token
    if (user.refreshToken === hashedRefreshToken) {
      user.refreshToken = null;
      await user.save();
    }
  } catch (error) {
    // Token invalid or expired
    // Still allow logout
    return;
  }
};

module.exports = {
  login,
  register,
  logout,
};
