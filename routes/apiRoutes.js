const db = require("../models");
const express = require("express");
const app = express();

// api routes:

// get ("/api/workouts") -- to read all docs from the database

// post ("/api/workouts") -- to create a workout doc
app.post("/api/workouts", ({body}, res) => {
    db.WorkoutModel.create(body)
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

// update ("/api/workouts/:id") -- to update (add) exercises to the workout document


// get ("/api/workouts/range") -- to read the last 7 documents (workouts) from the collection to be displayed

// *** api.js, under public, has the front-end code for all four of the above API routes. (you need to hammer out the server-side code.)