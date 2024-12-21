import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmDelete = window.confirm("Are you sure you want to logout?");
    if (confirmDelete) {
      logout();
    }
  };

  return (
    <nav className="bg-gray-800 py-4">
      <ul className="flex justify-center space-x-4">
        {/* Link to Home/User Management System */}
        {!isAuthenticated && (
          <li>
            <Link
              to="/"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              User Management System
            </Link>
          </li>
        )}

        {/* Link to Profile page for authenticated users */}
        {isAuthenticated && (
          <li>
            <Link
              to="/profile"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Profile
            </Link>
          </li>
        )}

        {/* Links visible only for admin */}
        {isAdmin && (
          <>
            <li>
              <Link
                to="/admin/user-management"
                className="text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                User Management
              </Link>
            </li>
          </>
        )}

        {/* Logout button for authenticated users */}
        {isAuthenticated && (
          <li>
            <Link
              to="/"
              onClick={handleLogout}
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
