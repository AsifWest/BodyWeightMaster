import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const workout = { title, weight, reps, sets };

        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
            } else {
                const json = await response.json();
                setTitle('');
                setWeight('');
                setReps('');
                setSets(''); // Reset sets state as well
                setError(null);
                console.log('New workout added', json);
                dispatch({ type: 'CREATE_WORKOUT', payload: json });
            }
        } catch (error) {
            console.error('Error adding workout:', error);
            setError('Failed to add workout. Please try again.');
        }
    };

    return (
        <div>
            <form className='create' onSubmit={handleSubmit}>
                <h3>Add a New Workout</h3>

                <label>Exercise Title</label>
                <input
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label>Weight (in kg):</label>
                <input
                    type='number'
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                />

                <label>Reps:</label>
                <input
                    type='number'
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                />

                <label>Sets:</label>
                <input
                    type='number'
                    onChange={(e) => setSets(e.target.value)}
                    value={sets}
                />

                <button>Add Workout</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default WorkoutForm;
