const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: true
              },
            
              name: {
                type: String,
                trim: true,
                required: "Name is Required"
              },
            
              duration: {
                type: Number,
                required: false
              },
            
              distance: {
                type: Number,
                required: false
              },
            
              weight: {
                type: Number,
                required: false
              },
            
              reps: {
                type: Number,
                required: false
              },
            
              sets: {
                type: Number,
                required: false
              }
            
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;