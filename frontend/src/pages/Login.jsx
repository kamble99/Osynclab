import { useState } from "react";
import { loginUser } from "../services/authservices";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Login = () => {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await loginUser(form);

      localStorage.setItem("token", res.data.access);

      window.location.href = "/dashboard";

    } catch (error) {

      alert("Invalid credentials");

    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b]">

        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 border border-white/20">

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white font-semibold"
            >
              Login
            </button>
            <p className="text-center text-gray-300 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Register
              </Link>
            </p>

          </form>

        </div>

      </div>
    </>
  );
};

export default Login;