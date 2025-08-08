
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  addFlight,
  updateFlight,
  getAllUsers,
  updateUserTokens,
} = require("../controllers/adminController");

router.post("/flights", [authMiddleware, adminMiddleware], addFlight);


router.put("/flights/:id", [authMiddleware, adminMiddleware], updateFlight);


router.get("/users", [authMiddleware, adminMiddleware], getAllUsers);


router.put(
  "/users/:id/tokens",
  [authMiddleware, adminMiddleware],
  updateUserTokens
);

module.exports = router;
