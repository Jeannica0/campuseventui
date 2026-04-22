import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

const Events = () => {
  const { state, dispatch } = useEvents();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();

      const eventsWithStatus = data.map(post => ({
        ...post,
        completed: false
      }));

      dispatch({
        type: 'SET_EVENTS',
        payload: eventsWithStatus
      });

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.events.length === 0) {
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>⏳ Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;

  return (
    <div style={{
      background: darkMode ? '#121212' : '#f9f9f9',
      color: darkMode ? '#fff' : '#000',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <h2>📅 Events</h2>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <input
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />

      <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
        {state.events
          .filter(ev =>
            ev.title.toLowerCase().includes(search.toLowerCase())
          )
          .map(ev => (
            <div
              key={ev.id}
              style={{
                padding: '1rem',
                background: darkMode ? '#1e1e1e' : '#fff',
                borderRadius: '10px',
                opacity: ev.completed ? 0.6 : 1
              }}
            >
              <h3 style={{
                textDecoration: ev.completed ? 'line-through' : 'none'
              }}>
                {ev.title}
              </h3>

              <p>
                {ev.completed ? '✅ Completed' : '⏳ Pending'}
              </p>

              <Link to={`/events/${ev.id}`}>
                View Details →
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Events;