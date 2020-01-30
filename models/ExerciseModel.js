const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({

  exercise_name: {
    type: String,
    trim: true,
    required: "A name for this type of exercise is required!"
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
    required: "How long does this exercise take?"
  }
//if the workout is cardio, they should also be able to track the distance traveled
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
// THE ORANGE THING ABOVE WILL BE THE NAME IN ROBO 3T

module.exports = Exercise;
