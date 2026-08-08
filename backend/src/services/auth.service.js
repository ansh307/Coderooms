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

  //  Require email verification
  if (!user.isEmailVerified) {
    throw new Error("Please verify your email before logging in");
  }

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
      name: user.name,
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

  const normalizedEmail = email.trim().toLowerCase();

  // Check if email already exists
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate email verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Hash token before storing
  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Create user
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    age,
    gender,
    role: "user",

    // Email verification
    isEmailVerified: false,
    emailVerificationToken: hashedVerificationToken,
    emailVerificationExpires: new Date(Date.now() + 15 * 60 * 1000),
  });

  // Remove password from response
  user.password = undefined;

  return {
    user,
    verificationToken, // send this in email link
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

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  // Verify JWT
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  // Hash received token
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // Find user
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Compare stored token
  if (user.refreshToken !== hashedRefreshToken) {
    throw new Error("Invalid refresh token");
  }

  // Generate new access token
  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );

  // Rotate refresh token
  const newRefreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const hashedNewRefreshToken = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  user.refreshToken = hashedNewRefreshToken;

  await user.save({ validateBeforeSave: false });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

const getMe = async (userId) => {
  const user = await User.findById(userId).select("-refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const forgotPassword = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  return {
    resetToken,
    user,
  };
};

const resetPassword = async ({ token, password }) => {
  if (!token || !password) {
    throw new Error("Token and password are required");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  }).select("+password");

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.password = await bcrypt.hash(password, 10);

  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return user;
};

const verifyEmail = async (token) => {
  if (!token) {
    throw new Error("Verification token is required");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;

  await user.save({ validateBeforeSave: false });

  return user;
};

module.exports = {
  login,
  register,
  logout,
  refreshToken,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
