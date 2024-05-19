import { useEffect } from "react";
import { UseWorkoutContext } from "../hooks/useWorkoutContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// api
import { api } from "../config/api";
import { config } from "../config/config";

// actions
import actions from '../context/WorkoutActions';

const Home = () => {

    const { workouts, dispatch } = UseWorkoutContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const { response, json } = await api(
                config.routes.GET_WORKOUTS_API,
                "GET",
                {}
            );
            
            if (response.ok) {
                dispatch({ 
                    type: actions.GET_WORKOUTS, 
                    payload: json.results
                });
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                { workouts && workouts.map(workout => (
                    <WorkoutDetails 
                        key={workout._id}
                        workout={workout}
                    />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;