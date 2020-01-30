const db = require("../models");

module.exports = function (app) {
//create the routs to hope the app's HTML pages!

// index.html ("/")
    // should direct the index.html page 


// exercise.html ("/exercise")
// stats.html ("/stats")


// (3) route for viewing workouts
app.get("/workoutURL", (req, res) => {
  db.WorkoutModel.find({})
    .then(dbFitness => {
      res.json(dbFitness);
      console.log("lalala testing", dbFitness)
    })
    .catch(err => {
      res.json(err);
    });
});

//create workouts (container).
    //log multiple exercises IN a workout on a given day

// add exercises (subclasses) to a PREVIOUS workout plan.
}