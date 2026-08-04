const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async ({ email, password }) => {
  // Validate fields
  if (!email?.trim() || !password?.trim()) {
    throw new Error("Email and password are required");
  }

  // Find user with password
  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // Remove password before returning user
  user.password = undefined;

  return {
    user,
    token,
  };
};

const register = async ({ name, password, email, age, gender, role }) => {
  // Required fields
  if (
    !name?.trim() ||
    !password?.trim() ||
    !email?.trim() ||
    !age ||
    !gender ||
    !role
  ) {
    throw new Error("All fields are required");
  }

  // Check existing email
  const existingUser = await User.findOne({
    where: { email: email.trim().toLowerCase() },
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

  // Generate token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return { user, token };
};

module.exports = {
  login,
  register,
};
