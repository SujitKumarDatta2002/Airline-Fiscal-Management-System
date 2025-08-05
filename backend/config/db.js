// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
