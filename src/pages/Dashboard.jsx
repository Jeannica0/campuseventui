import { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { state, dispatch } = useEvents();
  const { user } = useAuth();

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const addEvent = () => {
    if (!newTitle.trim()) return;

    const newEvent = {
      id: Date.now(),
      title: newTitle,
      body: newBody || 'No description',
      completed: false
    };

    dispatch({ type: 'ADD_EVENT', payload: newEvent });
    setNewTitle('');
    setNewBody('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📊 Dashboard</h2>

      <p>
        Welcome, <strong>{user?.name}</strong>! Here you can manage events.
      </p>

      {/* ADD EVENT SECTION */}
      <div
        style={{
          margin: '2rem 0',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '12px'
        }}
      >
        <h3>➕ Add New Event</h3>

        <input
          type="text"
          placeholder="Event title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          style={{
            display: 'block',
            margin: '0.5rem 0',
            padding: '0.5rem',
            width: '100%'
          }}
        />

        <textarea
          placeholder="Event description"
          value={newBody}
          onChange={e => setNewBody(e.target.value)}
          style={{
            display: 'block',
            margin: '0.5rem 0',
            padding: '0.5rem',
            width: '100%'
          }}
        />

        <button onClick={addEvent}>➕ Add Event</button>
      </div>

      {/* EVENT LIST */}
      <h3>📋 Your Events</h3>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {state.events.map(ev => (
          <li
            key={ev.id}
            style={{
              borderBottom: '1px solid #ccc',
              padding: '0.75rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              opacity: ev.completed ? 0.6 : 1,
              textDecoration: ev.completed ? 'line-through' : 'none'
            }}
          >
            {/* TITLE + STATUS */}
            <div>
              <strong>{ev.title}</strong> -{' '}
              {ev.completed ? '✅ Completed' : '⏳ Pending'}
            </div>

            {/* ACTION BUTTONS */}
            <div>
              <button
                onClick={() =>
                  dispatch({
                    type: 'TOGGLE_EVENT',
                    payload: ev.id
                  })
                }
                style={{ marginRight: '0.5rem' }}
              >
                {ev.completed ? '↩️ Mark Pending' : '✔️ Mark Done'}
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: 'DELETE_EVENT',
                    payload: ev.id
                  })
                }
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '6px'
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;