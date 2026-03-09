import { Link } from "react-router-dom";
import { Home, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-10 py-5 bg-[#020c1b] text-white shadow-lg">

      {/* Logo */}
      <h1 className="text-2xl font-bold">
        OSyncLab
      </h1>

      {/* Navigation */}
      <div className="flex items-center space-x-6">

        {/* Home */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <Home size={20} />
          Home
        </Link>

        {/* Login & Register (only before login) */}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>

            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        )}

        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* Logout (only after login) */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        )}

      </div>

    </nav>
  );
};

export default Navbar;