// FILE: backend/controllers/adminController.js
const Flight = require("../models/Flight");
const User = require("../models/User");

// Add a new flight
exports.addFlight = async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    const flight = await newFlight.save();
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update an existing flight
exports.updateFlight = async (req, res) => {
  try {
    let flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ msg: "Flight not found" });

    flight = await Flight.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users and exclude their passwords from the result
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a user's tokens
exports.updateUserTokens = async (req, res) => {
  const { tokens } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update the user's token count
    user.tokens = tokens;
    await user.save();

    res.json({ msg: "User tokens updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
