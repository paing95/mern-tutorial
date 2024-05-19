const express = require('express');
const router = express.Router();

// imports
const { 
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
} = require('../controllers/workoutController');

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// UPDATE an existing workout
router.patch('/:id', updateWorkout);

// DELETE an existing workout
router.delete('/:id', deleteWorkout);

module.exports = router;