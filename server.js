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

// API routes
// app.use(require("./routes/apiRoutes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


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

// Objective: get ALL workouts from workout.db.
// Matching code: lines 2-12 in "api.js"
app.get("/api/workouts", (req, res) => {
  db.WorkoutModel.find({  })
    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      res.json(err);
    });
});

// Objective: To add exercises TO an existing workout.
// front end -- lines 13 thru 24 in "api.js"
app.put("/api/workouts/:id", (req, res) => {
  console.log("body of the PUT to 'api/workouts'", req.body);
  console.log("Parameter of the PUT to 'api/workouts'", req.params.id);
  db.WorkoutModel.update({ _id:req.params.id },{ $push: { exercises: req.body }})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
  })

// Objective: create a new Workout.
// Matching code: lines 26-36 in "api.js"
app.post("/api/workouts", ({body}, res) => {
  console.log("body of request to api/workouts", body);
  db.WorkoutModel.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
  })

// Objective: get last 7 Workouts to be displayed on "stats.html" page.
// Matching code: lines 38-43 in "api.js"
app.get("/api/workouts/range", (req, res) => {

  db.WorkoutModel.find({})

    .then(dbFitness => {

      let range = dbFitness.slice(dbFitness.length-7);
      res.json(range);

    })
    .catch(err => {
      res.json(err);
    });
});