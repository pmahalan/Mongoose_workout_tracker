const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
      type: Date
    },

    exercises: [
      {  
      type: {
        type: String,
        trim: true
      },
      //cardio will be one of the types
      //idk what other types are... intensity? resistance? weight?
    
      name: {
        type: String,
        trim: true,
        required: "A name for this type of exercise is required!"
      },

      duration: {
        type: String,
        trim: true,
        required: "How long does this exercise take?"
      },

      weight: {
        type: Number,
        trim: true
      },

      reps: {
        type: Number,
        trim: true
      },
    
      sets: {
        type: Number,
        trim: true
      },

      distance: {
        type: Number,
        trim: true
      }
    }
  ]

//if the workout is cardio, they should also be able to track the distance traveled
});

const WorkoutModel = mongoose.model("Workout", WorkoutSchema);

module.exports = WorkoutModel;
