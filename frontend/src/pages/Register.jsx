import { useState } from "react";
import Navbar from "../components/Navbar";

import { registerUser } from "../services/authservices";

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
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
            const response = await registerUser(form);
            alert("User registered successfully!");
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b]">

                <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 border border-white/20">

                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white font-semibold"
                        >
                            Register
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
};

export default Register;