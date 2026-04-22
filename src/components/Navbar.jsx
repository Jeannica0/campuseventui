import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav style={{ display: 'flex', gap: '1.5rem', padding: '1rem 2rem', alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px solid #ddd' }}>
      <Link to="/">🏠 Home</Link>
      <Link to="/events">📅 Events</Link>
      <Link to="/dashboard">📊 Dashboard</Link>
      <Link to="/login">🔐 Login</Link>
      <button onClick={() => setDarkMode(!darkMode)} style={{ marginLeft: 'auto' }}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;