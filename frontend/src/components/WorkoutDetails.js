import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { Trash2 } from 'lucide-react';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Weight (kg): </strong>{workout.weight}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p><strong>Sets: </strong>{workout.sets}</p>
      <p><strong>Created At: </strong>{formatDate(workout.createdAt)}</p>
      <span onClick={handleClick} className='delete-icon'>
        <Trash2 />
      </span>
    </div>
  );
};

export default WorkoutDetails;
