// backend/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   POST api/bookings
// @desc    Book a ticket for a flight
// @access  Private
router.post("/", authMiddleware, createBooking);

module.exports = router;

// ---
