// backend/middleware/adminMiddleware.js
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    // req.user.id is available from the preceding authMiddleware
    const user = await User.findById(req.user.id);

    if (user && user.role === "admin") {
      next(); // User is an admin, proceed to the route handler
    } else {
      res.status(403).json({ msg: "Access denied. Admins only." });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = adminMiddleware;
