const express = require("express");
const router = express.Router();

//get all workouts
router.get("/", (req, res) => {
  res.json({ mssg: "Get all workouts" });
});

//get a single workouts
router.get("/:id", (req, res) => {
  res.json({ mssg: "Get a single workout" });
});

// post a new workout
router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(400).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete a workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "Delete a workout" });
});

//update a workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "Update a workout" });
});

module.exports = router;
