import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
import {
  FaHome,
  FaFacebook,
  FaUsers,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaFacebookMessenger,
  FaSearch,
} from "react-icons/fa";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // get the current user info
   const {profile} = useSelector(state => state.user)

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14">
        {/* Left: Logo + Search */}
        <div className="flex items-center space-x-2 ">
          <NavLink to="/" className=" text-blue-600 w-[30px] h-[30px] flex justify-center item-center text-3xl font-bold ">
            <FaFacebook/>
          </NavLink>

          {/* Search Bar (hidden on mobile) */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-3">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Facebook"
              className="bg-transparent focus:outline-none text-sm w-56"
            />
          </div>
        </div>

        {/* Center: Navigation Icons */}
        {user && (
          <div className="hidden md:flex space-x-8 text-gray-600 text-3xl">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 border-b-2 border-blue-600 " : "hover:text-blue-600"}>
              <FaHome />
            </NavLink>
            <NavLink to="/friends" className={({ isActive }) => isActive ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}>
              <FaUsers />
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}>
              <FaUser />
            </NavLink>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center space-x-3">
          {user && (
            <>
              <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                <FaFacebookMessenger size={18} />
              </button>
              <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                <FaBell size={18} />
              </button>

              <div className="relative">
                <img
                  src={profile.profilePicture}
                  className="w-9 h-9 rounded-full border"
                  onClick={() => setMenuOpen(!menuOpen)}
                />
                {menuOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <FaUser className="mr-2" /> Profile
                      </div>
                    </NavLink>
                    <button
                      onClick={() => {
                        logoutHandler();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <FaSignOutAlt className="mr-2" /> Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-2 space-y-2">
          {user && (
            <>
              <NavLink to="/" className="block py-1 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                <FaHome className="inline mr-2" /> Home
              </NavLink>
              <NavLink to="/friends" className="block py-1 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                <FaUsers className="inline mr-2" /> Friends
              </NavLink>
              <NavLink to="/profile" className="block py-1 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                <FaUser className="inline mr-2" /> Profile
              </NavLink>
              <button
                onClick={() => {
                  logoutHandler();
                  setMenuOpen(false);
                }}
                className="block w-full text-left py-1 text-red-600 hover:text-red-800"
              >
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <NavLink to="/login" className="block py-1 text-blue-600" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className="block py-1 bg-blue-600 text-white text-center rounded" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;