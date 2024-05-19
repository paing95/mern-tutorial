import { UseWorkoutContext } from "../hooks/useWorkoutContext";

// api
import { api } from "../config/api";
import { config } from "../config/config";

// actions
import actions from '../context/WorkoutActions';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = UseWorkoutContext();
    
    const handleClick = async () => {

        const { response, json } = await api(
            config.routes.GET_WORKOUTS_API + workout._id,
            "DELETE",
            {}
        );

        if (response.ok) {
            dispatch({ 
                type: actions.DELETE_WORKOUT, 
                payload: json.results 
            });
        }

    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps (kg): </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails;