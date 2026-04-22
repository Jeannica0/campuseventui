import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';

// Lazy load Dashboard
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<div style={{ padding: '2rem' }}>⏳ Loading Dashboard...</div>}>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;