import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function StudentDashboard() {
  const navigate = useNavigate();

  const [, setRefresh] =
    useState(false);

  // =========================================
  // AUTO REFRESH
  // =========================================

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

  // =========================================
  // SAFE STORAGE
  // =========================================

  const getStorageData = (
    key
  ) => {
    const data =
      localStorage.getItem(key);

    if (!data) {
      return [];
    }

    try {
      const parsed =
        JSON.parse(data);

      return Array.isArray(
        parsed
      )
        ? parsed
        : [];
    } catch {
      return [];
    }
  };

  // =========================================
  // STORAGE DATA
  // =========================================

  const routes =
    getStorageData("routes");

  const assignedStudents =
    getStorageData(
      "assignedStudents"
    );

  const liveBusData =
    getStorageData(
      "liveBusData"
    );

  // =========================================
  // CURRENT STUDENT
  // =========================================

  const loggedInStudent =
    assignedStudents.find(
      (student) =>
        student.bus === "Bus 1"
    ) || {};

  const studentName =
    loggedInStudent.student ||
    "Sri Ram";

  const assignedBus =
    loggedInStudent.bus ||
    "Bus 1";

  const pickupStop =
    loggedInStudent.stop ||
    "SR Nagar";

  // =========================================
  // ROUTE
  // =========================================

  const studentRoute =
    routes.find(
      (route) =>
        route.bus ===
        assignedBus
    ) || {};

  const routeStops =
    studentRoute?.stops || [
      "chintal",
      "Balanagar",
      "Balkumpet",
      "erragadda",
      "SR Nagar",
      "ameerpet",
    ];

  // =========================================
  // LIVE BUS DATA
  // =========================================

  const currentBus =
    liveBusData.find(
      (bus) =>
        bus.bus ===
        assignedBus
    ) || {};

  // =========================================
  // LIVE LOCATION
  // =========================================

  const currentLocation =
    currentBus.currentStop ||
    "erragadda";

  const nextStop =
    currentBus.nextStop ||
    "SR Nagar";

  const busSpeed =
    currentBus.speed || 28;

  const trafficLevel =
    currentBus.traffic ||
    "Medium";

  const updatedTime =
    currentBus.updatedTime ||
    new Date().toLocaleTimeString();

  // =========================================
  // INDEXES
  // =========================================

  const currentIndex =
    routeStops.indexOf(
      currentLocation
    );

  const studentIndex =
    routeStops.indexOf(
      pickupStop
    );

  // =========================================
  // REMAINING STOPS
  // =========================================

  let remainingStops = 0;

  if (
    currentIndex >= 0 &&
    studentIndex >= 0
  ) {
    remainingStops =
      studentIndex -
      currentIndex;
  }

  // =========================================
  // DISTANCE
  // =========================================

  const distanceRemaining =
    remainingStops > 0
      ? (
          remainingStops * 2.5
        ).toFixed(1)
      : 0;

  // =========================================
  // ETA
  // =========================================

  let estimatedMinutes = 0;

  if (remainingStops > 0) {
    estimatedMinutes =
      Math.round(
        (distanceRemaining /
          busSpeed) *
          60
      );
  }

  let estimatedArrivalTime =
    "--";

  if (estimatedMinutes > 0) {
    const arrival =
      new Date(
        Date.now() +
          estimatedMinutes *
            60000
      );

    estimatedArrivalTime =
      arrival.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
  }

  // =========================================
  // PROGRESS
  // =========================================

  const progressPercent =
    currentIndex >= 0
      ? Math.round(
          ((currentIndex +
            1) /
            routeStops.length) *
            100
        )
      : 0;

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      {/* NAVBAR */}

      <div className="navbar">
        <h2>
          🚌 School Bus Tracking
        </h2>

        <div className="nav-links">
          <Link to="/">
            Home
          </Link>

          <Link to="/admin">
            Admin
          </Link>

          <Link to="/driver">
            Driver
          </Link>
        </div>
      </div>

      {/* MAIN */}

      <div className="container">
        <h1>
          🎓 Student Dashboard
        </h1>

        {/* TOP CARDS */}

        <div className="dashboard-grid">

          {/* STUDENT INFO */}

          <div className="card">
            <h2>
              👨‍🎓 Student Info
            </h2>

            <p>
              <strong>
                Name:
              </strong>{" "}
              {studentName}
            </p>

            <p>
              <strong>
                Bus:
              </strong>{" "}
              {assignedBus}
            </p>

            <p>
              <strong>
                Pickup Stop:
              </strong>{" "}
              {pickupStop}
            </p>
          </div>

          {/* LIVE STATUS */}

          <div className="card live-status-card">
            <h2>
              🚌 Live Status
            </h2>

            <h3
              style={{
                color:
                  "#1565c0",
                marginBottom:
                  "10px",
              }}
            >
              {currentLocation}
            </h3>

            <p>
              Bus Moving Towards{" "}
              <strong>
                {nextStop}
              </strong>
            </p>

            <p>
              Speed:
              {" "}
              {busSpeed} km/h
            </p>

            <p>
              Traffic:
              {" "}
              {trafficLevel}
            </p>

            <p>
              Updated:
              {" "}
              {updatedTime}
            </p>
          </div>

          {/* ETA */}

          <div className="card success-card">
            <h2>
              ⏱ ETA
            </h2>

            <div className="big-eta">
              {
                estimatedMinutes
              } min
            </div>

            <p>
              Arrival Time:
              {" "}
              {
                estimatedArrivalTime
              }
            </p>

            <p>
              Distance:
              {" "}
              {
                distanceRemaining
              } KM
            </p>
          </div>

          {/* PROGRESS */}

          <div className="card">
            <h2>
              📊 Route Progress
            </h2>

            <p>
              {progressPercent}%
              Completed
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progressPercent}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* LIVE ROUTE */}

        <div
          className="card full-width-card"
          style={{
            marginTop: "30px",
          }}
        >
          <h2>
            📍 Live Route Tracking
          </h2>

          <div className="route-container">

            {/* ROUTE LINE */}

            <div className="route-line"></div>

            {routeStops.map(
              (
                stop,
                index
              ) => {
                const isCurrent =
                  stop ===
                  currentLocation;

                const isStudent =
                  stop ===
                  pickupStop;

                const isPassed =
                  index <
                  currentIndex;

                return (
                  <div
                    key={index}
                    className={`stop-card
                    ${
                      isCurrent
                        ? "current-stop"
                        : ""
                    }
                    ${
                      isStudent
                        ? "student-stop"
                        : ""
                    }
                    ${
                      isPassed
                        ? "passed-stop"
                        : ""
                    }`}
                  >

                    {/* BUS ICON */}

                    {isCurrent ? (
                      <div className="bus-icon">
                        🚌

                        <div className="live-badge">
                          LIVE
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`stop-dot
                        ${
                          isPassed
                            ? "dot-passed"
                            : isStudent
                            ? "dot-student"
                            : "dot-upcoming"
                        }`}
                      ></div>
                    )}

                    {/* STOP */}

                    <h2>
                      {stop}

                      {isCurrent &&
                        " (Current Location)"}

                      {isStudent &&
                        !isCurrent &&
                        " 📍"}
                    </h2>

                    {/* STATUS */}

                    <div className="status-box">

                      {isCurrent && (
                        <p>
                          Bus moving
                          towards{" "}
                          <strong>
                            {
                              nextStop
                            }
                          </strong>
                        </p>
                      )}

                      {isPassed &&
                        !isCurrent && (
                          <p>
                            Bus crossed
                            this stop
                          </p>
                        )}

                      {!isPassed &&
                        !isCurrent &&
                        !isStudent && (
                          <p>
                            Upcoming Stop
                          </p>
                        )}

                      {isStudent &&
                        remainingStops >
                          0 && (
                          <p>
                            Bus reaches
                            here in{" "}
                            <strong>
                              {
                                estimatedMinutes
                              }{" "}
                              mins
                            </strong>
                          </p>
                        )}

                      {isStudent &&
                        remainingStops ===
                          0 && (
                          <p>
                            Bus has
                            reached your
                            stop
                          </p>
                        )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* ACCOUNT */}

        <div
          className="card"
          style={{
            marginTop: "30px",
          }}
        >
          <h2>
            👤 Account
          </h2>

          <button
            onClick={
              handleLogout
            }
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;