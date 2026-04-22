import { useParams, Navigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

const EventDetails = () => {
  const { id } = useParams();
  const { state } = useEvents();
  const event = state.events.find(ev => ev.id === parseInt(id));

  if (!event) return <Navigate to="/events" replace />;

  return (
    <div>
      <h2>📌 Event Details</h2>
      <p><strong>ID:</strong> {event.id}</p>
      <p><strong>Title:</strong> {event.title}</p>
      <p><strong>Description:</strong> {event.body}</p>
      <p><strong>Status:</strong> {event.completed ? '✅ Completed' : '⏳ Pending'}</p>
    </div>
  );
};

export default EventDetails;