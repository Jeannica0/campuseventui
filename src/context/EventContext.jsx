import { createContext, useContext, useReducer } from 'react';

const EventContext = createContext();

// 🔥 Load from localStorage (IMPORTANT FIX)
const initialState = {
  events: JSON.parse(localStorage.getItem('events')) || []
};

const eventReducer = (state, action) => {
  let updatedEvents;

  switch (action.type) {

    case 'SET_EVENTS':
      updatedEvents = action.payload;
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return { ...state, events: updatedEvents };

    case 'ADD_EVENT':
      updatedEvents = [action.payload, ...state.events];
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return { ...state, events: updatedEvents };

    case 'DELETE_EVENT':
      updatedEvents = state.events.filter(ev => ev.id != action.payload);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return { ...state, events: updatedEvents };

    case 'TOGGLE_EVENT':
      updatedEvents = state.events.map(ev =>
        ev.id == action.payload
          ? { ...ev, completed: !ev.completed }
          : ev
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return { ...state, events: updatedEvents };

    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);