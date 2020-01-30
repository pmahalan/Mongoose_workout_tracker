const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  // CODE HERE
  workout_name: {
    type: String,
    trim: true,
    required: "A name for your workout is required!"
  },

  type: {
    type: String,
    trim: true
  },

   weight: {
    type: Number,
    trim: true
  },

  sets: {
    type: Number,
    trim: true
  },

reps: {
  type: Number,
  trim: true
},

duration: {
  type: String,
  trim: true,
  required: "How long does this workout take?"
}

//if the workout is cardio, they should also be able to track the distance traveled

});

const WorkoutModel = mongoose.model("Workout", WorkoutSchema);

module.exports = WorkoutModel;
