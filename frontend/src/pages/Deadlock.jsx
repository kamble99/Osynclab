import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Deadlock = () => {
  const navigate = useNavigate();

  const [processes, setProcesses] = useState("P1,P2");
  const [available, setAvailable] = useState("0,0");
  const [request, setRequest] = useState("");
  const [result, setResult] = useState(null);

  const parseMatrix = (text) => {
    return text.split("\n").map(row =>
      row.split(",").map(Number)
    );
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/deadlock/", {
        processes: processes.split(","),
        available: available.split(",").map(Number),
        request: parseMatrix(request),
      });

      setResult(res.data);
    } catch (err) {
      alert("Error");
    }
  };

  const handleReset = () => {
    setProcesses("");
    setAvailable("");
    setRequest("");
    setResult(null);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0a192f] text-white p-8 pt-28 flex flex-col items-center">

        <h1 className="text-4xl mb-6 animate-pulse">
          Deadlock Detection System
        </h1>

        <div className="bg-[#112240] p-6 rounded-xl w-full max-w-xl space-y-4">

          <input
            value={processes}
            onChange={(e) => setProcesses(e.target.value)}
            placeholder="Processes (P1,P2)"
            className="w-full p-2 bg-[#0a192f]"
          />

          <input
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            placeholder="Available (0,0)"
            className="w-full p-2 bg-[#0a192f]"
          />

          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder={`Request Matrix\n1,0\n0,1`}
            className="w-full p-2 bg-[#0a192f]"
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 p-2 rounded"
            >
              Check
            </button>

            <button
              onClick={handleReset}
              className="w-full bg-yellow-500 p-2 rounded"
            >
              Reset
            </button>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-700 p-2 rounded"
          >
            Back
          </button>
        </div>

       
        {result && (
          <div className="mt-6 p-4 bg-[#112240] rounded animate-fade-in">
            <h2 className="text-xl">
              {result.status === "Deadlock"
                ? "❌ Deadlock Detected"
                : "✅ No Deadlock"}
            </h2>
            <p className="mt-2">{result.message}</p>
          </div>
        )}

        <style>
          {`
            .animate-fade-in {
              animation: fadeIn 0.8s ease forwards;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}
        </style>

      </div>
    </>
  );
};

export default Deadlock;