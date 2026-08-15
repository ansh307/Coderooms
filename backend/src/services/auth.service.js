const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  hashRefreshToken,
  generateRefreshToken,
  generateRefreshTokenFamily,
  encryptRefreshToken,
  decryptRefreshToken,
  REFRESH_TOKEN_GRACE_PERIOD,
} = require("../utils/refreshToken");

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
  const refreshTokenFamily = generateRefreshTokenFamily();

  const refreshToken = generateRefreshToken(
    user._id.toString(),
    refreshTokenFamily,
  );

  const hashedRefreshToken = hashRefreshToken(refreshToken);

  user.refreshToken = hashedRefreshToken;

  user.previousRefreshToken = null;
  user.previousRefreshTokenExpiresAt = null;

  user.refreshTokenFamily = refreshTokenFamily;

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
    const user = await User.findById(decoded.userId).select(
      "+refreshToken +previousRefreshToken +previousRefreshTokenExpiresAt +refreshTokenFamily",
    );

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

const refreshToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new Error("Refresh token is required");
  }

  /*
   * 1. Verify JWT
   */

  let decoded;

  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  /*
   * 2. Hash incoming token
   */

  const incomingHash = hashRefreshToken(incomingRefreshToken);

  /*
   * 3. Get user + refresh token fields
   */

  const user = await User.findById(decoded.userId).select(
    "+refreshToken +previousRefreshToken +previousRefreshTokenValue +previousRefreshTokenExpiresAt +refreshTokenFamily",
  );

  if (!user) {
    throw new Error("User not found");
  }

  /*
   * 4. Check account
   */

  if (!user.isActive) {
    throw new Error("Account is deactivated");
  }

  /*
   * 5. Verify token family
   */

  if (!decoded.family || decoded.family !== user.refreshTokenFamily) {
    throw new Error("Invalid refresh token");
  }

  /*
   * 6. Check current token
   */

  const isCurrentToken = user.refreshToken === incomingHash;

  /*
   * 7. Check previous token
   */

  const isPreviousToken =
    user.previousRefreshToken === incomingHash &&
    user.previousRefreshTokenExpiresAt &&
    user.previousRefreshTokenExpiresAt > new Date();

  /*
   * 8. Completely invalid token
   */

  if (!isCurrentToken && !isPreviousToken) {
    throw new Error("Invalid refresh token");
  }

  /*
   * 9. Generate access token
   */

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

  /*
   * 10. Handle concurrent refresh
   *
   * The old refresh token was already rotated,
   * but it is still inside the grace period.
   *
   * Return the SAME refresh token that was
   * generated by the first request.
   */

  if (isPreviousToken) {
    if (!user.previousRefreshTokenValue) {
      throw new Error("Invalid refresh token");
    }

    const existingRefreshToken = decryptRefreshToken(
      user.previousRefreshTokenValue,
    );

    return {
      accessToken,
      refreshToken: existingRefreshToken,
    };
  }

  /*
   * 11. Normal refresh rotation
   */

  const newRefreshToken = generateRefreshToken(
    user._id.toString(),
    user.refreshTokenFamily,
  );

  const hashedNewRefreshToken = hashRefreshToken(newRefreshToken);

  /*
   * 12. Move current → previous
   */

  user.previousRefreshToken = user.refreshToken;

  user.previousRefreshTokenValue = encryptRefreshToken(newRefreshToken);

  user.previousRefreshTokenExpiresAt = new Date(
    Date.now() + REFRESH_TOKEN_GRACE_PERIOD,
  );

  /*
   * 13. New token → current
   */

  user.refreshToken = hashedNewRefreshToken;

  await user.save({
    validateBeforeSave: false,
  });

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

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
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

const resendVerificationEmail = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isEmailVerified) {
    throw new Error("Email is already verified");
  }

  // Generate a new raw token
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");

  // Store only the hashed token
  user.emailVerificationToken = crypto
    .createHash("sha256")
    .update(emailVerificationToken)
    .digest("hex");

  // Token expires in 15 minutes
  user.emailVerificationExpires = Date.now() + 15 * 60 * 1000;

  await user.save({
    validateBeforeSave: false,
  });

  return {
    emailVerificationToken,
    user,
  };
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
  resendVerificationEmail,
};
