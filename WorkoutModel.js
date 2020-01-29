const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  // CODE HERE
  workout_name: {
    type: String,

  },
  // a required string; trimmed

  type: {
    type: String,
  },

weight: {
    
  },


  sets: {

  },

reps: {},

duration: {}

//if the workout is cardio, they should also be able to track the distance traveled

});

const WorkoutModel = mongoose.model("Workout", WorkoutSchema);

module.exports = WorkoutModel;
