// imports
const {
    hasAllRequiredFields,
    isIDValid
} = require('../helpers/validators');
const WorkoutModel = require('../models/workoutModel');

// Get all workouts
const getWorkouts = async (req, resp) => {
    const workouts = await WorkoutModel.find().sort({ createdAt: -1 });
    resp.status(200).json({ 'results': workouts });
};

// Get a single workout
const getWorkout = async (req, resp) => {
    const { id } = req.params;

    if (!isIDValid(id)) {
        return resp.status(404).json({ 'error': 'Workout does not exist.' });
    }

    const workout = await WorkoutModel.findById(id);

    if (!workout) {
        return resp.status(404).json({ 'error': 'Workout does not exist.' });
    }

    resp.status(200).json({ 'results': workout });
}


// Create a new workout
const createWorkout = async (req, resp) => {    
    const fields_required = [
        'title', 'reps', 'load'
    ];
    const { is_valid, invalid_fields } = hasAllRequiredFields(fields_required, req.body);

    if (!is_valid) {
        return resp.status(500).json({ 'error': 'Not all required fields are provided.', invalid_fields });
    }

    try {
        const { title, reps, load } = req.body;
        console.log(`Workout Payload - title: ${title}, reps: ${reps}, load: ${load}`);

        const workout = await WorkoutModel.create({
            title, reps, load
        });
        resp.status(200).json({ 'results': workout });
    } catch (error) {
        resp.status(500).json({ 'error': error.message });
    }
};


// Update a workout
const updateWorkout = async (req, resp) => {
    const { id } = req.params;

    if (!isIDValid(id)) {
        return resp.status(404).json({ 'error': 'Workout does not exist.' });
    }

    const workout = await WorkoutModel.findOneAndUpdate({ _id: id}, {
        ...req.body
    });

    if (!workout) {
        return resp.status(404).json({ 'error': 'Workout does not exist.' });
    }

    resp.status(200).json({ 'results': workout });
};


// Delete a workout
const deleteWorkout = async (req, resp) => {
    const { id } = req.params;

    if (!isIDValid(id)) {
        return resp.status(404).json({ 'error': 'Workout does not exist.' });
    }

    const workout = await WorkoutModel.findOneAndDelete({ _id: id });
    
    if (!workout) {
        return resp.status(404).json({ 'error': 'Workout does not exist.' });
    }

    resp.status(200).json({ 'results': workout });
};

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
};