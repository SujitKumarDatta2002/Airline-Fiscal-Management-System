
const Flight = require("../models/Flight");

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ msg: "Flight not found" });
    }
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


