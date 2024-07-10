import React, { createContext, useReducer } from "react";

const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload,
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [...state.workouts, action.payload], // Append new workout to the end
            };
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            };
        default:
            return state;
    }
};

const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: [] // Initialize workouts as an empty array
    });

    return (
        <WorkoutsContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};

export { WorkoutsContextProvider, WorkoutsContext };
