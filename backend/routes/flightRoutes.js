// backend/routes/flightRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllFlights,
  getFlightById,
} = require("../controllers/flightController");

// @route   GET api/flights
// @desc    Get all flights
// @access  Public
router.get("/", getAllFlights);

// @route   GET api/flights/:id
// @desc    Get a single flight by ID
// @access  Public
router.get("/:id", getFlightById);

module.exports = router;

// ---
