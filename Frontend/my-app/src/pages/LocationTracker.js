import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LocationTracker() {
  const [, setRefresh] =
    useState(false);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setRefresh(
          (prev) => !prev
        );
      }, 3000);

    return () =>
      clearInterval(interval);
  }, []);

  const getStorageData = (
    key
  ) => {
    const data =
      localStorage.getItem(key);

    if (!data) return [];

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  const liveBusData =
    getStorageData(
      "liveBusData"
    );

  const currentBus =
    liveBusData[0] || {};

  const currentStop =
    currentBus.currentStop ||
    "Waiting";

  const nextStop =
    currentBus.nextStop || "-";

  const updatedTime =
    currentBus.updatedTime ||
    "--";

  const busNumber =
    currentBus.bus || "Bus 1";

  return (
    <div>
      <div className="navbar">
        <h2>
          🚌 Location Tracker
        </h2>

        <div className="nav-links">
          <Link to="/student">
            Student Dashboard
          </Link>
        </div>
      </div>

      <div className="container">
        <h1>
          📍 My Current Location
        </h1>

        <div className="card">
          <h2>
            🚌 {busNumber}
          </h2>

          <h1
            style={{
              color: "green",
            }}
          >
            {currentStop}
          </h1>

          <p>
            Current Bus Stop
          </p>

          <hr />

          <h3>
            Next Stop:
            {" "}
            {nextStop}
          </h3>

          <p>
            Updated:
            {" "}
            {updatedTime}
          </p>
        </div>

        <div className="card">
          <h2>
            🎯 Travel Status
          </h2>

          <p>
            You are currently
            travelling with the
            bus.
          </p>

          <p>
            Whenever the bus
            reaches a new stop,
            this page updates
            automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LocationTracker;