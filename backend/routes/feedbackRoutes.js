// backend/routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/feedbackController");

// @route   POST api/feedback
// @desc    Submit feedback for a flight
// @access  Public
router.post("/", submitFeedback);

module.exports = router;
