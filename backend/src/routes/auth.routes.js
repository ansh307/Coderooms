const router =  require('express').Router();

const authController = require('../controllers/auth.controller.js')
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/login', authController.login)
router.post('/signup', authController.register)
router.post("/refresh", authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/verify-email", authController.verifyEmail);

// Protected Routes
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
