import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#0a192f] text-white shadow-lg w-full">
      <div className="flex items-center justify-between px-10 py-4">

        {/* Left Side */}
        <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
          Osynch
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-300 transition"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="hover:text-blue-300 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;