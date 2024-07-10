const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Constructing a schema for the database
const workoutSchema = new Schema({
    title: { 
      type: String,
      required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps:true });

module.exports = mongoose.model('Workout', workoutSchema);
