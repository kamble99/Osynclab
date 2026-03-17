import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Semaphore = () => {
  const [processInput, setProcessInput] = useState("");
  const [semaphore, setSemaphore] = useState(1);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 

      const handleReset = () => {
      setProcessInput("");
      setSemaphore(1);
      setResult([]);
      };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const processes = processInput.split(",").map(p => p.trim());

      const res = await axios.post("http://127.0.0.1:8000/api/semaphore/", {
        processes,
        semaphore,
      });

      

      setTimeout(() => {
        setResult(res.data.result);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Error connecting to backend");
    }
  };

  return (
    <>
     
      <Navbar />

      <div className="min-h-screen bg-[#0a192f] text-white flex flex-col items-center p-8 pt-28">
       

        <h1 className="text-4xl font-bold mb-6 animate-pulse">
          Semaphore Simulator
        </h1>

        {/* Card */}
        <div className="bg-[#112240] p-6 rounded-2xl shadow-lg w-full max-w-xl transition-transform hover:scale-105 duration-300">

          <label className="block mb-2 text-gray-300">
            Processes (comma separated)
          </label>
          <input
            type="text"
            value={processInput}
            onChange={(e) => setProcessInput(e.target.value)}
            placeholder="P1, P2, P3"
            className="w-full p-2 mb-4 rounded bg-[#0a192f] border border-gray-600"
          />

          <label className="block mb-2 text-gray-300">
            Semaphore Value
          </label>
          <input
            type="number"
            value={semaphore}
            onChange={(e) => setSemaphore(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-[#0a192f] border border-gray-600"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 p-2 rounded font-semibold"
          >
            Run Simulation
          </button>
          &nbsp;
          <button
            onClick={handleReset}
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition duration-300 p-2 rounded font-semibold"
          >
            Reset
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 w-full bg-gray-700 hover:bg-gray-800 transition duration-300 p-2 rounded font-semibold"
          >
            ← Back to Dashboard
          </button>
        </div>

        {loading && (
          <div className="mt-6 animate-spin rounded-full h-10 w-10 border-t-2 border-blue-400"></div>
        )}

       
        {result.length > 0 && !loading && (
          <div className="mt-8 w-full max-w-xl animate-fade-in">
            <h2 className="text-2xl mb-4">Result</h2>

            <table className="w-full border border-gray-600">
              <thead className="bg-[#112240]">
                <tr>
                  <th className="p-3">Process</th>
                  <th className="p-3">State</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center border-t border-gray-700 hover:bg-[#1c2b4a]"
                  >
                    <td className="p-3">{item.process}</td>
                    <td
                      className={`p-3 font-semibold ${item.state === "Critical Section"
                          ? "text-green-400"
                          : "text-red-400"
                        }`}
                    >
                      {item.state}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        
        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in {
              animation: fadeIn 0.8s ease forwards;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Semaphore;