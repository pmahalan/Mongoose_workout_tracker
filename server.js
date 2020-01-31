const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//___________________________

// -        HTML ROUTES       -

// -       index.html ("/")
app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../Mongoose_workout_tracker/public/index.html"));
});

// -       exercise.html ("/exersice")
app.get('/exercise', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../Mongoose_workout_tracker/public/exercise.html"));
}); 

// -       stats.html ("/stats")
app.get('/stats', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../Mongoose_workout_tracker/public/stats.html"));
});

//___________________________

// -        API ROUTES       -

// To handle the HTTP requests from the client and return the information from the database to the client.

// -       get ("/api/workouts") - to Read all documents from the database. (done!!!)
app.get("/api/workouts", (req, res) => {
  db.WorkoutModel.find({})
    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      res.json(err);
    });
});

// -       post ("/api/workouts") - to Create a Workout Document. 

// This doesn't seem to be working. I should seek help.

// Shouldn't this particular route be connected to something on the front-end? I.e. input fields and a submit button???
app.post("/api/workouts", ({body}, res) => {
  db.WorkoutModel.create(body)
    .then(({_id}) => db.WorkoutModel.findOneAndUpdate({}, { $push: { workouts: _id }}, { new: true }))
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
  })

// -       update ("/api/workouts/:id") - to update (add) exercises to the workout document.
//          Just like adding books to the library. (Find the route that was responsible for that.)
//          I DON'T KNOW HOW TO DO THIS, there were no update routes in any of the examples from day 1. 
//          Maybe I should look at group project #2? I know we definitley used update there.



// -       get ("/api/workouts/range") - to Read the last 7 documents (Workouts) from the collection to be displayed in the "stats.html" page.
//          for this we'll probably refer to the first API route I hammered out above, then just filter it down to 7...




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  