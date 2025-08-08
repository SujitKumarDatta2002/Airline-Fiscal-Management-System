
const Feedback = require("../models/Feedback");
const Flight = require("../models/Flight");

exports.submitFeedback = async (req, res) => {
  const { flightId, rating, comment } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ msg: "Flight not found" });
    }

    const newFeedback = new Feedback({
      flight: flightId,
      rating,
      comment,
    });

    await newFeedback.save();
    res.json({ msg: "Feedback submitted successfully", feedback: newFeedback });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
