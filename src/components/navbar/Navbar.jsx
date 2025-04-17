import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
      : 'text-gray-600 hover:text-blue-500';

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Brand / Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <NavLink to="/">MyApp</NavLink>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 text-lg">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/services" className={linkClass}>
          Services
        </NavLink>
        <NavLink to="/login" className={linkClass}>
          Login
        </NavLink>
        <NavLink to="/signup" className={linkClass}>
          Signup
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
