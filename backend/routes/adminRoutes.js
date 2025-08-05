// FILE: backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  addFlight,
  updateFlight,
  getAllUsers,
  updateUserTokens,
} = require("../controllers/adminController");

// All routes in this file are protected and require admin access
// The middleware runs in sequence: first auth, then admin check

// @route   POST api/admin/flights
// @desc    Add a new flight
// @access  Admin
router.post("/flights", [authMiddleware, adminMiddleware], addFlight);

// @route   PUT api/admin/flights/:id
// @desc    Update an existing flight
// @access  Admin
router.put("/flights/:id", [authMiddleware, adminMiddleware], updateFlight);

// @route   GET api/admin/users
// @desc    Get all users (for token management)
// @access  Admin
router.get("/users", [authMiddleware, adminMiddleware], getAllUsers);

// @route   PUT api/admin/users/:id/tokens
// @desc    Update a user's token balance
// @access  Admin
router.put(
  "/users/:id/tokens",
  [authMiddleware, adminMiddleware],
  updateUserTokens
);

module.exports = router;
