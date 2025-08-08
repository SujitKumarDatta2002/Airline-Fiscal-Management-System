
const express = require("express");
const router = express.Router();
const {
  getAllFlights,
  getFlightById,
} = require("../controllers/flightController");


router.get("/", getAllFlights);


router.get("/:id", getFlightById);

module.exports = router;


