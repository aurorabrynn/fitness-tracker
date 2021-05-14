const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get(`/exercise`, (req, res) =>
  res.sendFile(path.join(__dirname, `public/exercise.html`)
  ));

app.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }])
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/:id", (req, res) => {
  db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }])
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", async (req, res) => {
  try {
    const response = await db.Workout.create({ type: "workout" })
    res.json(response);
  }
  catch (err) {
    console.log("error occurred while creating a workout:", err)
  }
});

app.put("/api/workouts/:id", async (req, res) => {
  try {
    const response = await db.Workout.findByIdAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
    res.json(response);
  }
  catch (err) {
    console.log("error occurred while creating a workout:", err)
  }
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }]).sort({ _id: -1 }).limit(7)
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

/* app.get("/populatedworkout", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});*/

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
