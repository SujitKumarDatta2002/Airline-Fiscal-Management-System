// // backend/models/User.js
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

// // ---
// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ADDED: role field with a default value of 'user'
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // ADDED: tokens field for flight booking currency
    tokens: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
