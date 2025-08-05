// backend/models/Flight.js
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  totalSeats: { type: Number, default: 60 },
  bookedSeats: { type: [Number], default: [] },
});

module.exports = mongoose.model("Flight", flightSchema);

// ---
