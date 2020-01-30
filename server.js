const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//refer to week 9 day 1 exercise 11 to fill this out...?
// unless they help you fill it out more in the startup.
const PORT = process.env.PORT || 3000;

const WorkoutModel = require("./WorkoutModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", { useNewUrlParser: true });

//upon the submission of some text (a workout model with exercises),
// the newly created model is stored in the "dbFitness" document.

app.post("/submit", ({body}, res) => {
  WorkoutModel.create(body)
    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      res.json(err);
    });
});

//view workouts (container).

//create workouts (container).
    //log multiple exercises IN a workout on a given day

// add exercises (subclasses) to a NEW workout plan.

// add exercises (subclasses) to a PREVIOUS workout plan.




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  