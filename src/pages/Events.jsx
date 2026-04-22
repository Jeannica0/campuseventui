// src/pages/Events.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

const Events = () => {
  const { state, dispatch } = useEvents();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) throw new Error('Failed to fetch events');

      const data = await res.json();

      const eventsWithStatus = data.map(post => ({
        ...post,
        completed: false
      }));

      dispatch({ type: 'SET_EVENTS', payload: eventsWithStatus });
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Loading
  if (loading) return <p>⏳ Loading events...</p>;

  // Error
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;

  return (
    <div
      style={{
        background: darkMode ? '#121212' : '#f9f9f9',
        color: darkMode ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '1rem'
      }}
    >
      {/* Header */}
      <h2>📅 Events</h2>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          marginBottom: '1rem',
          padding: '8px 12px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          marginBottom: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />

      {/* Last Updated */}
      {lastUpdated && (
        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          Last updated: {lastUpdated}
        </p>
      )}

      {/* Events List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {state.events
          ?.filter(event =>
            event.title.toLowerCase().includes(search.toLowerCase())
          )
          .map(event => (
            <div
              key={event.id}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                background: darkMode ? '#1e1e1e' : '#fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                transition: '0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.transform = 'scale(1.02)')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <h3>{event.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Event ID: {event.id}
              </p>

              <Link
                to={`/events/${event.id}`}
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                View Details →
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Events;