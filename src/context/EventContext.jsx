import { createContext, useContext, useReducer } from 'react';

const EventContext = createContext();

const initialState = { events: [] };

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'DELETE_EVENT':
      return { ...state, events: state.events.filter(ev => ev.id !== action.payload) };
    case 'TOGGLE_STATUS':
      return {
        ...state,
        events: state.events.map(ev =>
          ev.id === action.payload ? { ...ev, completed: !ev.completed } : ev
        )
      };
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