import { useState } from "react";

// context
import { UseWorkoutContext } from "../hooks/useWorkoutContext";

// api
import { api } from "../config/api";
import { config } from "../config/config";

// actions
import actions from '../context/WorkoutActions';

const WorkoutForm = () => {

    const { dispatch } = UseWorkoutContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [invalidFields, setInvalidFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {
            title, load, reps
        };

        const { response, json } = await api(
            config.routes.CREATE_WORKOUT_API,
            "POST",
            workout
        );

        if (!response.ok) {
            setError(json.error);
            setInvalidFields(json.invalid_fields);
        } else {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setInvalidFields([]);

            console.log("New workout added:", json);

            dispatch({
                type: actions.CREATE_WORKOUT,
                payload: json.results
            })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            
            <label>Exercise Title:</label>
            <input 
                type="text" 
                className={invalidFields.includes('title') ? 'error' : ''}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (in kg):</label>
            <input 
                type="number" 
                className={invalidFields.includes('load') ? 'error' : ''}
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input 
                type="number" 
                className={invalidFields.includes('reps') ? 'error' : ''}
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Submit</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;