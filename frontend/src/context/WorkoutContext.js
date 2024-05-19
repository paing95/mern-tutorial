import { createContext, useReducer } from "react";

// actions
import actions from './WorkoutActions';

export const WorkoutContext = createContext();

export const WorkoutReducer = (state, action) => {
    switch(action.type) {
        case actions.GET_WORKOUTS:
            return {
                workouts: action.payload
            };
        case actions.CREATE_WORKOUT:
            return {
                workouts: [
                    action.payload,
                    ...state.workouts
                ]
            };
        case actions.DELETE_WORKOUT:
            return {
                workouts: state.workouts.filter(
                    workout => workout._id !== action.payload._id
                )
            }
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(WorkoutReducer, {
        workouts: null
    });

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch}}>
            { children }
        </WorkoutContext.Provider>
    )
}