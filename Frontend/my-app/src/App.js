import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import LocationTracker from "./pages/LocationTracker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/driver" element={<DriverDashboard />} />

        <Route path="/student" element={<StudentDashboard />} />
        <Route
    path="/location-tracker"
    element={<LocationTracker />}
  />


      </Routes>
    </BrowserRouter>
  );
}

export default App;