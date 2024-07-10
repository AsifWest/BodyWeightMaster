const express = require('express');
const {
    getWorkout,
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout
} = require('../controlers/workoutcontroller');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require auth for all workout routes
router.use(requireAuth);

// Workout routes
router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);

module.exports = router;
