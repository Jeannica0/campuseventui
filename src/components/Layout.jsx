import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;