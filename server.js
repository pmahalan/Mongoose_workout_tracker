const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//refer to week 9 day 1 exercise 11 to fill this out...?
// unless they help you fill it out more in the startup.
const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", { useNewUrlParser: true });

// (1) I'm creating a new workout (and calling it No. 1 Workout)
db.WorkoutModel.create({ name: "No. 1 Workout" })
// WorkoutModel above refers to the name of my module.exports in the model
  .then(dbFitness => {
    console.log(dbFitness);
  })
  .catch(({message}) => {
    console.log(message);
  });


// (2) Route for creating an exercise (which by default needs to go into a workout)
app.post("/submit", ({body}, res) => {
  db.ExerciseModel.create(body)
  // ExerciseModel above refers to the name of my module.exports in the model
    .then(({_id}) => db.WorkoutModel.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    // exercises above refers to the attribute of the WorkoutModel model.

    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      res.json(err);
    });
});


// (3) route for viewing workouts
app.get("/workoutURL", (req, res) => {
  db.WorkoutModel.find({})
    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      res.json(err);
    });
});

//create workouts (container).
    //log multiple exercises IN a workout on a given day

// add exercises (subclasses) to a PREVIOUS workout plan.




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  