  import React, { useState } from "react";
  import axios from "axios";
  import Navbar from "../components/Navbar";
  import { useNavigate } from "react-router-dom";

  const Scheduler = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
      processes: "P1,P2,P3",
      arrival: "0,1,2",
      burst: "5,3,1",
      algorithm: "FCFS",
      quantum: 2,
    });

    const [result, setResult] = useState([]);
    const [gantt, setGantt] = useState([]);

    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
      const res = await axios.post("http://127.0.0.1:8000/api/scheduler/", {
        processes: data.processes.split(","),
        arrival: data.arrival.split(",").map(Number),
        burst: data.burst.split(",").map(Number),
        algorithm: data.algorithm,
        quantum: Number(data.quantum),
      });

      setResult(res.data.result);
      setGantt(res.data.gantt);
    };

    const handleReset = () => {
      setResult([]);
      setGantt([]);
    };

    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#0a192f] text-white p-8 pt-28 flex flex-col items-center">

          <h1 className="text-4xl mb-6 animate-pulse">
            CPU Scheduler
          </h1>

          <div className="bg-[#112240] p-6 rounded-xl w-full max-w-xl space-y-4">

            <input name="processes" value={data.processes} onChange={handleChange}
              className="w-full p-2 bg-[#0a192f]" />

            <input name="arrival" value={data.arrival} onChange={handleChange}
              className="w-full p-2 bg-[#0a192f]" />

            <input name="burst" value={data.burst} onChange={handleChange}
              className="w-full p-2 bg-[#0a192f]" />

            <select name="algorithm" value={data.algorithm} onChange={handleChange}
              className="w-full p-2 bg-[#0a192f]">
              <option>FCFS</option>
              <option>SJF</option>
              <option>RR</option>
            </select>

            {data.algorithm === "RR" && (
              <input name="quantum" value={data.quantum} onChange={handleChange}
                className="w-full p-2 bg-[#0a192f]" />
            )}

            <div className="flex gap-3">
              <button onClick={handleSubmit}
                className="w-full bg-blue-600 p-2 rounded">
                Run
              </button>

              <button onClick={handleReset}
                className="w-full bg-yellow-500 p-2 rounded">
                Reset
              </button>
            </div>

            <button onClick={() => navigate("/dashboard")}
              className="w-full bg-gray-700 p-2 rounded">
              Back
            </button>
          </div>

        
          {gantt.length > 0 && (
            <div className="mt-6 flex">
              {gantt.map((g, i) => (
                <div key={i}
                  className="bg-blue-500 p-4 m-1 text-center"
                  style={{ minWidth: "60px" }}>
                  {g.process}
                  <div className="text-xs">{g.start}-{g.end}</div>
                </div>
              ))}
            </div>
          )}

        
          {result.length > 0 && (
            <table className="mt-6 border">
              <thead>
                <tr>
                  <th className="p-2">Process</th>
                  <th className="p-2">WT</th>
                  <th className="p-2">TAT</th>
                </tr>
              </thead>
              <tbody>
                {result.map((r, i) => (
                  <tr key={i}>
                    <td className="p-2">{r.process}</td>
                    <td className="p-2">{r.waiting}</td>
                    <td className="p-2">{r.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </>
    );
  };

  export default Scheduler;