const Workouts = require('../Modles/WorkoutModle');
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id; // Get the authenticated user's ID
    const workouts = await Workouts.find({ user_id }).sort({ createdAt: 1 });
    res.status(200).json(workouts);
}

// Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    const workout = await Workouts.findOne({ _id: id, user_id: req.user._id });

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
}

// Create a new workout
const createWorkout = async (req, res) => {
    const { title, weight,sets, reps } = req.body;
    const user_id = req.user._id; // Get the authenticated user's ID

    try {
        const workout = await Workouts.create({ title, weight,sets, reps, user_id });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    const workout = await Workouts.findOneAndDelete({ _id: id, user_id: req.user._id });

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
}

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    const workout = await Workouts.findOneAndUpdate(
        { _id: id, user_id: req.user._id },
        { ...req.body },
        { new: true } // Return the updated document
    );

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
}

module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout
}
