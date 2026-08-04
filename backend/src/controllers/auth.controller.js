const authService = require("../services/auth.service.js");

const login = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } =
      await authService.login(req.body);

    // Store refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await authService.register(
      req.body,
    );

    // Store refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    const status = error.message === "Email already registered" ? 409 : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout Controller
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    await authService.logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Logout failed",
    });
  }
};

module.exports = {
  login,
  register,
  logout,
};
