import React, { useEffect, useContext } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { WorkoutsContext } from '../context/WorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const { state, dispatch } = useContext(WorkoutsContext);
    const { user } = useAuthContext();
    const { workouts } = state;

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('/api/workouts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch workouts');
                }
                const json = await response.json();
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            } catch (error) {
                console.error('Error fetching workouts:', error);
                // Handle error state or display error message
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
