// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getLoggedInUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", loginUser);

// @route   GET api/auth/user
// @desc    Get logged in user data
// @access  Private
router.get("/user", authMiddleware, getLoggedInUser);

module.exports = router;

// ---
