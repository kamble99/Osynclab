import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const features = [
    {
      title: "Deadlock Detection Module",
      desc: "Visualize and detect deadlocks using resource allocation graphs.",
      path: "/deadlock",
    },
    {
      title: "CPU Scheduling Visualizer",
      desc: "Simulate FCFS, SJF, Round Robin & more with Gantt charts.",
      path: "/schedular",
    },
    {
      title: "Semaphore Synchronization",
      desc: "Understand process synchronization using semaphores.",
      path: "/semaphore",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b] text-white overflow-hidden">

       
        <motion.div
          className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"
          animate={{ x: [0, 200, -200, 0], y: [0, -100, 100, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"
          animate={{ x: [0, -200, 200, 0], y: [0, 100, -100, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
        />

        
        <motion.h1
          className="text-4xl font-bold mb-10 z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to OS Dashboard 🚀
        </motion.h1>

       
        <div className="grid md:grid-cols-3 gap-8 px-6 z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(feature.path)}
              className="cursor-pointer p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-blue-500/30 transition"
            >
              <h2 className="text-xl font-semibold mb-3">
                {feature.title}
              </h2>
              <p className="text-sm text-gray-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

     
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.1 }}
          className="mt-12 px-6 py-2 bg-red-500 rounded-lg shadow-lg hover:bg-red-600 z-10"
        >
          Logout
        </motion.button>
      </div>
    </>
  );
};

export default Dashboard;