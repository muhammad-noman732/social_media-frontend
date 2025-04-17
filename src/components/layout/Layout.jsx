import React from 'react';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />  {/* Current page will render here */}
      </main>
    </div>
  );
};

export default Layout;
