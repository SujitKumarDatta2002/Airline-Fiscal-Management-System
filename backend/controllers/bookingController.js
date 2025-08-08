
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const User = require("../models/User");

exports.createBooking = async (req, res) => {
  const { flightId, seatNumber } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    const user = await User.findById(req.user.id);

    if (!flight) {
      return res.status(404).json({ msg: "Flight not found" });
    }
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.tokens < flight.price) {
      return res
        .status(400)
        .json({ msg: "Insufficient tokens for this booking" });
    }

    if (flight.bookedSeats.includes(seatNumber)) {
      return res.status(400).json({ msg: "Seat already booked" });
    }
    if (seatNumber < 1 || seatNumber > flight.totalSeats) {
      return res.status(400).json({ msg: "Invalid seat number" });
    }

    user.tokens -= flight.price;
    await user.save();

    flight.bookedSeats.push(seatNumber);
    await flight.save();

    const newBooking = new Booking({
      user: req.user.id,
      flight: flightId,
      seatNumber,
    });

    const booking = await newBooking.save();
    res.json({ booking, remainingTokens: user.tokens }); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
