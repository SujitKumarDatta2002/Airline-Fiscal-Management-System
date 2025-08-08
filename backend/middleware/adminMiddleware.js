
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {

    const user = await User.findById(req.user.id);

    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ msg: "Access denied. Admins only." });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = adminMiddleware;
