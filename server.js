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

// #### On the "htmlRoutes.js" file write code to:
// -   Create the routes to open the application's HTML pages.
// -   You will need at least three html routes to render:
// -       index.html ("/")
app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../Mongoose_workout_tracker/public/index.html"));
});

// -       exercise.html ("/exersice")
  //html route to the page to create a new user
  app.get('/exercise', function (req, res, next) {
    res.sendFile(path.join(__dirname, "../Mongoose_workout_tracker/public/exercise.html"));
  });

// -       stats.html ("/stats")
  //html route to page with form for creating new event
  app.get('/stats', function (req, res, next) {
    res.sendFile(path.join(__dirname, "../Mongoose_workout_tracker/public/stats.html"));
  });

// #### On the "apiRoutes.js" file write code to:
// -   Create routes to handle the HTTP requests from the client and return the information from the database to the client.
// -   You will need at least four api routes:

// -       get ("/api/workouts") - to Read all documents from the database. (done)
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

// -       update ("/api/workouts/:id") - to update (add) exercises to the workout document.
// -       get ("/api/workouts/range") - to Read the last 7 documents (Workouts) from the collection to be displayed in the "stats.html" page.





app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  