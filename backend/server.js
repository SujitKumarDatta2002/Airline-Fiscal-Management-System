// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const workouts = require("./routes/workouts");
// //express app
// const app = express();

// //middleware
// app.use(express.json());
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });
// //routes

// app.use("/api/workouts", workouts);

// // connect to db
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     // listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log("Connected to db & Listening on port", process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// backend/server.js
// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
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
// ADDED: Use the new admin routes
app.use("/api/admin", require("./routes/adminRoutes"));
// --- Add dummy data (for testing) ---
// This function will add sample flights to your database if it's empty.
const Flight = require("./models/Flight"); // Make sure to require the Flight model

const addDummyData = async () => {
  try {
    // Check if there are any flights already
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

// Define the port
const PORT = process.env.PORT || 4000;

// Start the server and add dummy data
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Call the function to add flights when the server starts
  addDummyData();
});
