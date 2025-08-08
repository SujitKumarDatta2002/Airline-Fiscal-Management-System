
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();


const app = express();


connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
// Adding dummy data
const Flight = require("./models/Flight");

const addDummyData = async () => {
  try {
    const flightCount = await Flight.countDocuments();
    if (flightCount > 0) {
      console.log(
        "Flights already exist in the database. Skipping dummy data insertion."
      );
      return;
    }

    console.log("No flights found. Adding dummy data...");
    const flights = [
      {
        flightNumber: "AI-202",
        origin: "Dhaka (DHK)",
        destination: "Chittagong (CTG)",
        departureTime: new Date("2024-10-26T08:00:00Z"),
        arrivalTime: new Date("2024-10-26T10:15:00Z"),
        price: 4500,
        totalSeats: 60,
      },
      {
        flightNumber: "6E-555",
        origin: "Chittagong (CTG)",
        destination: "Sylhet (SYL)",
        departureTime: new Date("2024-10-26T12:30:00Z"),
        arrivalTime: new Date("2024-10-26T13:30:00Z"),
        price: 3200,
        totalSeats: 60,
      },
      {
        flightNumber: "UK-818",
        origin: "Chittagong (CTG)",
        destination: "Dhaka (DHK)",
        departureTime: new Date("2024-10-27T15:00:00Z"),
        arrivalTime: new Date("2024-10-27T17:20:00Z"),
        price: 5100,
        totalSeats: 60,
      },
    ];
    await Flight.insertMany(flights);
    console.log("Dummy flights added successfully.");
  } catch (error) {
    console.error("Error adding dummy data:", error);
  }
};

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  addDummyData();
});
