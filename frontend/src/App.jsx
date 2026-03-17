import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import Deadlock from "./pages/Deadlock";
import CPUSchedular from "./pages/CPUSchedular";
import Semaphore from "./pages/Semaphore";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/deadlock" element={<Deadlock />} />
        <Route path="/schedular" element={<CPUSchedular />} />
        <Route path="/semaphore" element={<Semaphore />} />
       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;