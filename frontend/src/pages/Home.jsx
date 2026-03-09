import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#020c1b] via-[#0a192f] to-[#112240] text-white">

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center pt-27">

          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-bold"
          >
            OSyncLab
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-300 mt-6 max-w-xl"
          >
           OSyncLab is an interactive web platform that visually demonstrates major Operating System concepts including:  Process Synchronization  Deadlock Detection  Resource Allocation  CPU Scheduling  Performance Analysis    
          </motion.p>

        </div>

        {/* Features Section */}

        <div className="mt-15 px-20">

          <h2 className="text-4xl font-bold text-center mb-16">
            Project Features
          </h2>

          <div className="grid grid-cols-3 gap-10">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-8 rounded-xl backdrop-blur-lg"
            >
              <h3 className="text-xl font-bold mb-3">
                Deadlock Detection Module
              </h3>

              <p className="text-gray-300">
                Deadlock detection and recovery is the mechanism of detecting and resolving deadlocks in an operating system.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-8 rounded-xl backdrop-blur-lg"
            >
              <h3 className="text-xl font-bold mb-3">
                CPU Scheduling Visualizer
              </h3>

              <p className="text-gray-300">
               The CPU Scheduling Algorithm Visualizer is a web-based tool that allows users to interactively visualize various CPU scheduling algorithms.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-8 rounded-xl backdrop-blur-lg"
            >
              <h3 className="text-xl font-bold mb-3">
                semaphore synchronization
              </h3>

              <p className="text-gray-300">
                 The main aim of using a semaphore is process synchronization and access control for a common resource in a concurrent environment.
              </p>
            </motion.div>

          </div>
        </div>

        {/* Call to Action */}

        <div className="text-center mt-10 pb-20">

          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold"
            >
              Go To Dashboard
            </motion.button>
          </Link>

        </div>

      </div>
    </>
  );
};

export default Home;