import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function DriverDashboard() {
  const navigate = useNavigate();

  // =========================
  // LOCAL STORAGE SAFE
  // =========================
  const getStorageData = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return [];

    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  // =========================
  // DATA
  // =========================
  const routes = getStorageData("routes");
  const assignedDrivers = getStorageData("assignedDrivers");
  const assignedStudents = getStorageData("assignedStudents");

  const loggedInDriver =
    assignedDrivers.length > 0 ? assignedDrivers[0] : null;

  const driverBus = loggedInDriver?.bus || "";

  const driverRoute = routes.find((r) => r.bus === driverBus);

  const routeStops = driverRoute?.stops || [];

  const students = assignedStudents.filter(
    (s) => s.bus === driverBus
  );

  // =========================
  // STATES
  // =========================
  const [tripStarted, setTripStarted] = useState(false);
  const [tripEnded, setTripEnded] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const [tripStartTime, setTripStartTime] = useState(""); // ✅ NOW USED
  const [tripEndTime, setTripEndTime] = useState("");     // ✅ NOW USED

  const [lastReachedTime, setLastReachedTime] = useState(null);
  const [tripLogs, setTripLogs] = useState([]);

  // =========================
  // CURRENT INFO
  // =========================
  const currentStop = routeStops[currentStopIndex];

  const nextStop =
    currentStopIndex < routeStops.length - 1
      ? routeStops[currentStopIndex + 1]
      : null;

  const pickupStudents = tripStarted
    ? students.filter((s) => s.stop === currentStop)
    : students;

  // =========================
  // START TRIP
  // =========================
  const handleStartTrip = () => {
    if (routeStops.length === 0) {
      alert("No Route Assigned");
      return;
    }

    const now = new Date().toLocaleTimeString();

    setTripStarted(true);
    setTripEnded(false);
    setCurrentStopIndex(0);
    setTripStartTime(now); // ✅ USED
    setTripEndTime("");

    setLastReachedTime(new Date());

    setTripLogs([
      {
        stop: routeStops[0],
        reachedTime: now,
        travelTime: "Trip Started",
      },
    ]);
  };

  // =========================
  // NEXT STOP
  // =========================
  const handleNextStop = () => {
    if (!tripStarted) return alert("Start Trip First");

    if (currentStopIndex >= routeStops.length - 1)
      return alert("Final Stop Reached");

    const now = new Date();
    const reachedTime = now.toLocaleTimeString();

    let travelTime = "0 min";

    if (lastReachedTime) {
      const diff = now - lastReachedTime;
      const min = Math.floor(diff / 60000);
      const sec = Math.floor((diff % 60000) / 1000);
      travelTime = `${min}m ${sec}s`;
    }

    const nextIndex = currentStopIndex + 1;

    setTripLogs((prev) => [
      ...prev,
      {
        stop: routeStops[nextIndex],
        reachedTime,
        travelTime,
      },
    ]);

    setCurrentStopIndex(nextIndex);
    setLastReachedTime(now);
  };

  // =========================
  // END TRIP
  // =========================
  const handleEndTrip = () => {
    if (!tripStarted) return alert("Trip Not Started");

    const now = new Date().toLocaleTimeString();

    setTripStarted(false);
    setTripEnded(true);
    setTripEndTime(now); // ✅ USED
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    navigate("/");
  };

  // =========================
  // UI
  // =========================
  return (
    <div>

      {/* NAVBAR */}
      <div className="navbar">
        <h2>Bus Tracking System</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/student">Student</Link>
        </div>
      </div>

      <div className="container">
        <h1>Driver Dashboard</h1>

        {/* =========================
            DRIVING MODE
        ========================= */}
        <div className="card">

          <h2>Driving Mode</h2>

          {!tripStarted ? (
            <button className="start-btn" onClick={handleStartTrip}>
              🟢 START TRIP
            </button>
          ) : (
            <>
              <div className="focus-box">
                <h1 className="current-stop">{currentStop}</h1>
                <p>Current Stop</p>

                <div className="arrow">⬇️</div>

                <h2 className="next-stop">
                  {nextStop || "END"}
                </h2>
                <p>Next Stop</p>
              </div>

              <button className="next-btn" onClick={handleNextStop}>
                🔵 NEXT STOP
              </button>

              <button className="end-btn" onClick={handleEndTrip}>
                🔴 END TRIP
              </button>
            </>
          )}
        </div>

        {/* =========================
            DRIVER INFO
        ========================= */}
        <div className="card">
          <h2>Driver Info</h2>

          <p><b>Name:</b> {loggedInDriver?.driver || "N/A"}</p>
          <p><b>Bus:</b> {driverBus || "N/A"}</p>
        </div>

        {/* =========================
            TRIP STATUS (FIXED ESLINT HERE)
        ========================= */}
        <div className="card">
          <h2>Trip Status</h2>

          <p><b>Started:</b> {tripStarted ? "Yes" : "No"}</p>
          <p><b>Ended:</b> {tripEnded ? "Yes" : "No"}</p>

          <p><b>Start Time:</b> {tripStartTime || "Not Started"}</p>
          <p><b>End Time:</b> {tripEndTime || "Not Ended"}</p>

          <p>
            <b>Current Stop:</b>{" "}
            {tripStarted ? currentStop : "Not Started"}
          </p>
        </div>

        {/* =========================
            PICKUP STUDENTS
        ========================= */}
        <div className="card">
          <h2>
            {tripStarted
              ? `Students at ${currentStop}`
              : "Assigned Students"}
          </h2>

          {pickupStudents.length === 0 ? (
            <p>
              {tripStarted
                ? "No students at this stop"
                : "No students assigned to this bus"}
            </p>
          ) : (
            <ul>
              {pickupStudents.map((s, i) => (
                <li key={i}>
                  <b>{s.student}</b>
                  {!tripStarted && (
                    <>
                      <br />
                      <small>
                        Stop: {s.stop}
                      </small>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* =========================
            LOGS
        ========================= */}
        <div className="card">
          <h2>Trip Logs</h2>

          {tripLogs.length === 0 ? (
            <p>No logs</p>
          ) : (
            <ul>
              {tripLogs.map((log, i) => (
                <li key={i}>
                  <b>{log.stop}:</b><br />
                  {log.reachedTime} <br />
                  {log.travelTime}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* LOGOUT */}
        <div className="card">
          <h2>Account</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>

      </div>
    </div>
  );
}

export default DriverDashboard;