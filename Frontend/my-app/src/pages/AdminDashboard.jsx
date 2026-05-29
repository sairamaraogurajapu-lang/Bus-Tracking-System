import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AdminDashboard.css";

import AdminStats from "../components/admin/AdminStats";

function AdminDashboard() {
  const navigate = useNavigate();

  // =========================================
  // SAFE LOCAL STORAGE
  // =========================================

  const getStorageData = (key) => {
    const data = localStorage.getItem(key);

    if (!data) {
      return [];
    }

    try {
      const parsedData = JSON.parse(data);

      return Array.isArray(parsedData)
        ? parsedData
        : [];
    } catch (error) {
      return [];
    }
  };

  // =========================================
  // STATES
  // =========================================

  const [buses, setBuses] = useState(
    getStorageData("buses")
  );

  const [drivers, setDrivers] =
    useState(
      getStorageData("drivers")
    );

  const [students, setStudents] =
    useState(
      getStorageData("students")
    );

  const [stops, setStops] = useState(
    getStorageData("stops")
  );

  const [routes, setRoutes] = useState(
    getStorageData("routes")
  );

  const [
    assignedDrivers,
    setAssignedDrivers,
  ] = useState(
    getStorageData(
      "assignedDrivers"
    )
  );

  const [
    assignedStudents,
    setAssignedStudents,
  ] = useState(
    getStorageData(
      "assignedStudents"
    )
  );

  // =========================================
  // LOCAL STORAGE SAVE
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      "buses",
      JSON.stringify(buses)
    );
  }, [buses]);

  useEffect(() => {
    localStorage.setItem(
      "drivers",
      JSON.stringify(drivers)
    );
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  useEffect(() => {
    localStorage.setItem(
      "stops",
      JSON.stringify(stops)
    );
  }, [stops]);

  useEffect(() => {
    localStorage.setItem(
      "routes",
      JSON.stringify(routes)
    );
  }, [routes]);

  useEffect(() => {
    localStorage.setItem(
      "assignedDrivers",
      JSON.stringify(
        assignedDrivers
      )
    );
  }, [assignedDrivers]);

  useEffect(() => {
    localStorage.setItem(
      "assignedStudents",
      JSON.stringify(
        assignedStudents
      )
    );
  }, [assignedStudents]);

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    navigate("/");
  };

  // =========================================
  // BUS CRUD
  // =========================================

  const handleAddBus = () => {
    const busName = prompt(
      "Enter Bus Name"
    );

    if (!busName) return;

    setBuses([...buses, busName]);

    alert("Bus Added");
  };

  const handleEditBus = () => {
    if (buses.length === 0) {
      alert("No buses available");
      return;
    }

    const oldBus = prompt(
      `Enter Existing Bus:\n${buses.join(
        "\n"
      )}`
    );

    const newBus = prompt(
      "Enter New Bus Name"
    );

    if (!oldBus || !newBus) return;

    const updatedBuses = buses.map(
      (bus) =>
        bus === oldBus
          ? newBus
          : bus
    );

    const updatedRoutes = routes.map(
      (route) =>
        route.bus === oldBus
          ? {
              ...route,
              bus: newBus,
            }
          : route
    );

    setBuses(updatedBuses);
    setRoutes(updatedRoutes);

    alert("Bus Updated");
  };

  const handleDeleteBus = () => {
    if (buses.length === 0) {
      alert("No buses available");
      return;
    }

    const busName = prompt(
      `Enter Bus Name:\n${buses.join(
        "\n"
      )}`
    );

    if (!busName) return;

    setBuses(
      buses.filter(
        (bus) => bus !== busName
      )
    );

    setRoutes(
      routes.filter(
        (route) =>
          route.bus !== busName
      )
    );

    alert("Bus Deleted");
  };

  // =========================================
  // DRIVER CRUD
  // =========================================

  const handleAddDriver = () => {
    const driverName = prompt(
      "Enter Driver Name"
    );

    if (!driverName) return;

    setDrivers([
      ...drivers,
      driverName,
    ]);

    alert("Driver Added");
  };

  const handleEditDriver = () => {
    if (drivers.length === 0) {
      alert("No drivers available");
      return;
    }

    const oldDriver = prompt(
      `Enter Existing Driver:\n${drivers.join(
        "\n"
      )}`
    );

    const newDriver = prompt(
      "Enter New Driver Name"
    );

    if (!oldDriver || !newDriver)
      return;

    const updatedDrivers =
      drivers.map((driver) =>
        driver === oldDriver
          ? newDriver
          : driver
      );

    setDrivers(updatedDrivers);

    alert("Driver Updated");
  };

  const handleDeleteDriver = () => {
    if (drivers.length === 0) {
      alert("No drivers available");
      return;
    }

    const driverName = prompt(
      `Enter Driver Name:\n${drivers.join(
        "\n"
      )}`
    );

    if (!driverName) return;

    setDrivers(
      drivers.filter(
        (driver) =>
          driver !== driverName
      )
    );

    alert("Driver Deleted");
  };

  // =========================================
  // STUDENT CRUD
  // =========================================

  const handleAddStudent = () => {
    const studentName = prompt(
      "Enter Student Name"
    );

    if (!studentName) return;

    setStudents([
      ...students,
      studentName,
    ]);

    alert("Student Added");
  };

  const handleEditStudent = () => {
    if (students.length === 0) {
      alert("No students available");
      return;
    }

    const oldStudent = prompt(
      `Enter Existing Student:\n${students.join(
        "\n"
      )}`
    );

    const newStudent = prompt(
      "Enter New Student Name"
    );

    if (
      !oldStudent ||
      !newStudent
    )
      return;

    const updatedStudents =
      students.map((student) =>
        student === oldStudent
          ? newStudent
          : student
      );

    setStudents(updatedStudents);

    alert("Student Updated");
  };

  const handleDeleteStudent = () => {
    if (students.length === 0) {
      alert("No students available");
      return;
    }

    const studentName = prompt(
      `Enter Student Name:\n${students.join(
        "\n"
      )}`
    );

    if (!studentName) return;

    setStudents(
      students.filter(
        (student) =>
          student !== studentName
      )
    );

    alert("Student Deleted");
  };

  // =========================================
  // STOP CRUD
  // =========================================

  const handleAddStop = () => {
    const stopName = prompt(
      "Enter Stop Name"
    );

    if (!stopName) return;

    setStops([...stops, stopName]);

    alert("Stop Added");
  };

  const handleEditStop = () => {
    if (stops.length === 0) {
      alert("No stops available");
      return;
    }

    const oldStop = prompt(
      `Enter Existing Stop:\n${stops.join(
        "\n"
      )}`
    );

    const newStop = prompt(
      "Enter New Stop Name"
    );

    if (!oldStop || !newStop)
      return;

    const updatedStops = stops.map(
      (stop) =>
        stop === oldStop
          ? newStop
          : stop
    );

    setStops(updatedStops);

    alert("Stop Updated");
  };

  const handleDeleteStop = () => {
    if (stops.length === 0) {
      alert("No stops available");
      return;
    }

    const stopName = prompt(
      `Enter Stop Name:\n${stops.join(
        "\n"
      )}`
    );

    if (!stopName) return;

    setStops(
      stops.filter(
        (stop) => stop !== stopName
      )
    );

    alert("Stop Deleted");
  };

  // =========================================
  // ROUTE CRUD
  // =========================================

  const handleCreateRoute = () => {
    if (buses.length === 0) {
      alert("Please add buses");
      return;
    }

    const selectedBus = prompt(
      `Assign Route To Bus:\n${buses.join(
        "\n"
      )}`
    );

    if (!selectedBus) return;

    const startLocation = prompt(
      "Enter Start Location"
    );

    const endLocation = prompt(
      "Enter End Location"
    );

    const middleStops = prompt(
      "Enter Middle Stops With Comma\nExample:\nBalanagar,SR Nagar,Ameerpet"
    );

    if (
      !startLocation ||
      !endLocation
    ) {
      return;
    }

    const middleStopsArray =
      middleStops
        ? middleStops
            .split(",")
            .map((stop) =>
              stop.trim()
            )
            .filter((stop) => stop)
        : [];

    const allStops = [
      startLocation,
      ...middleStopsArray,
      endLocation,
    ];

    const newRoute = {
      bus: selectedBus,
      startLocation,
      endLocation,
      stops: allStops,
    };

    const filteredRoutes =
      routes.filter(
        (route) =>
          route.bus !== selectedBus
      );

    setRoutes([
      ...filteredRoutes,
      newRoute,
    ]);

    alert("Route Created");
  };

  const handleEditRoute = () => {
    if (routes.length === 0) {
      alert("No routes available");
      return;
    }

    const selectedBus = prompt(
      `Select Bus Route To Edit:\n${routes
        .map((route) => route.bus)
        .join("\n")}`
    );

    if (!selectedBus) return;

    const routeData = routes.find(
      (route) =>
        route.bus === selectedBus
    );

    if (!routeData) {
      alert("Route not found");
      return;
    }

    const newStart = prompt(
      "Edit Start Location",
      routeData.startLocation
    );

    const newEnd = prompt(
      "Edit End Location",
      routeData.endLocation
    );

    const currentMiddleStops =
      routeData.stops.slice(
        1,
        routeData.stops.length - 1
      );

    const newMiddleStops =
      prompt(
        "Edit Middle Stops",
        currentMiddleStops.join(
          ","
        )
      );

    if (!newStart || !newEnd)
      return;

    const updatedMiddleStops =
      newMiddleStops
        ? newMiddleStops
            .split(",")
            .map((stop) =>
              stop.trim()
            )
            .filter((stop) => stop)
        : [];

    const updatedStops = [
      newStart,
      ...updatedMiddleStops,
      newEnd,
    ];

    const updatedRoutes = routes.map(
      (route) => {
        if (
          route.bus === selectedBus
        ) {
          return {
            ...route,
            startLocation:
              newStart,
            endLocation: newEnd,
            stops: updatedStops,
          };
        }

        return route;
      }
    );

    setRoutes(updatedRoutes);

    alert("Route Updated");
  };

  const handleDeleteRoute = () => {
    if (routes.length === 0) {
      alert("No routes available");
      return;
    }

    const selectedBus = prompt(
      `Select Bus Route To Delete:\n${routes
        .map((route) => route.bus)
        .join("\n")}`
    );

    if (!selectedBus) return;

    const updatedRoutes =
      routes.filter(
        (route) =>
          route.bus !== selectedBus
      );

    setRoutes(updatedRoutes);

    alert("Route Deleted");
  };

  // =========================================
  // ASSIGN DRIVER
  // =========================================

  const handleAssignDriver = () => {
    if (
      drivers.length === 0 ||
      buses.length === 0
    ) {
      alert(
        "Please add buses and drivers"
      );
      return;
    }

    const selectedDriver = prompt(
      `Enter Driver:\n${drivers.join(
        "\n"
      )}`
    );

    const selectedBus = prompt(
      `Enter Bus:\n${buses.join(
        "\n"
      )}`
    );

    if (
      !selectedDriver ||
      !selectedBus
    )
      return;

    setAssignedDrivers([
      ...assignedDrivers,
      {
        driver: selectedDriver,
        bus: selectedBus,
      },
    ]);

    alert("Driver Assigned");
  };

  // =========================================
  // ASSIGN STUDENT
  // =========================================

  const handleAssignStudent = () => {
    if (
      students.length === 0 ||
      buses.length === 0
    ) {
      alert(
        "Please add buses and students"
      );
      return;
    }

    const selectedStudent = prompt(
      `Enter Student:\n${students.join(
        "\n"
      )}`
    );

    const selectedBus = prompt(
      `Enter Bus:\n${buses.join(
        "\n"
      )}`
    );

    const stop = prompt(
      "Enter Pickup Stop"
    );

    if (
      !selectedStudent ||
      !selectedBus ||
      !stop
    )
      return;

    setAssignedStudents([
      ...assignedStudents,
      {
        student: selectedStudent,
        bus: selectedBus,
        stop: stop,
      },
    ]);

    alert("Student Assigned");
  };

  // =========================================
  // UI
  // =========================================

  return (
    <div>
      <div className="admin-navbar">
        <h2>
          School Bus Tracking
          System
        </h2>

        <div className="admin-nav-links">
          <Link to="/">Home</Link>

          <Link to="/driver">
            Driver
          </Link>

          <Link to="/student">
            Student
          </Link>
        </div>
      </div>

      <div className="admin-container">
        <h1>Admin Dashboard</h1>

        <div className="admin-dashboard-grid">
          <AdminStats
            totalBuses={buses.length}
            totalDrivers={
              drivers.length
            }
            totalStudents={
              students.length
            }
            totalRoutes={
              routes.length
            }
            totalStops={
              stops.length
            }
          />

          {/* BUS */}

          <div className="admin-card">
            <h2>Bus Management</h2>

            <ul>
              {buses.map(
                (bus, index) => (
                  <li key={index}>
                    {bus}
                  </li>
                )
              )}
            </ul>

            <button
              onClick={handleAddBus}
            >
              Add Bus
            </button>

            <button
              onClick={handleEditBus}
            >
              Edit Bus
            </button>

            <button
              onClick={
                handleDeleteBus
              }
            >
              Delete Bus
            </button>
          </div>

          {/* DRIVER */}

          <div className="admin-card">
            <h2>
              Driver Management
            </h2>

            <ul>
              {drivers.map(
                (driver, index) => (
                  <li key={index}>
                    {driver}
                  </li>
                )
              )}
            </ul>

            <button
              onClick={
                handleAddDriver
              }
            >
              Add Driver
            </button>

            <button
              onClick={
                handleEditDriver
              }
            >
              Edit Driver
            </button>

            <button
              onClick={
                handleDeleteDriver
              }
            >
              Delete Driver
            </button>

            <button
              onClick={
                handleAssignDriver
              }
            >
              Assign Driver
            </button>
          </div>

          {/* STUDENT */}

          <div className="admin-card">
            <h2>
              Student Management
            </h2>

            <ul>
              {students.map(
                (student, index) => (
                  <li key={index}>
                    {student}
                  </li>
                )
              )}
            </ul>

            <button
              onClick={
                handleAddStudent
              }
            >
              Add Student
            </button>

            <button
              onClick={
                handleEditStudent
              }
            >
              Edit Student
            </button>

            <button
              onClick={
                handleDeleteStudent
              }
            >
              Delete Student
            </button>

            <button
              onClick={
                handleAssignStudent
              }
            >
              Assign Student
            </button>
          </div>

          {/* STOPS */}

          <div className="admin-card">
            <h2>Stops</h2>

            <ul>
              {stops.map(
                (stop, index) => (
                  <li key={index}>
                    {stop}
                  </li>
                )
              )}
            </ul>

            <button
              onClick={
                handleAddStop
              }
            >
              Add Stop
            </button>

            <button
              onClick={
                handleEditStop
              }
            >
              Edit Stop
            </button>

            <button
              onClick={
                handleDeleteStop
              }
            >
              Delete Stop
            </button>
          </div>

          {/* ROUTES */}

          <div className="admin-card">
            <h2>Bus Routes</h2>

            {routes.length === 0 ? (
              <p>
                No Routes Added
              </p>
            ) : (
              <ul>
                {routes.map(
                  (
                    route,
                    index
                  ) => (
                    <li key={index}>
                      <strong>
                        {route.bus}
                      </strong>

                      <br />

                      {
                        route.startLocation
                      }
                      {" → "}

                      {Array.isArray(
                        route.stops
                      ) &&
                        route.stops
                          .slice(
                            1,
                            route.stops
                              .length -
                              1
                          )
                          .join(
                            " → "
                          )}

                      {" → "}

                      {
                        route.endLocation
                      }
                    </li>
                  )
                )}
              </ul>
            )}

            <button
              onClick={
                handleCreateRoute
              }
            >
              Create Route
            </button>

            <button
              onClick={
                handleEditRoute
              }
            >
              Edit Route
            </button>

            <button
              onClick={
                handleDeleteRoute
              }
            >
              Delete Route
            </button>
          </div>

          {/* ASSIGNED DRIVERS */}

          <div className="admin-card">
            <h2>
              Assigned Drivers
            </h2>

            <ul>
              {assignedDrivers.map(
                (item, index) => (
                  <li key={index}>
                    {item.driver} →{" "}
                    {item.bus}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ASSIGNED STUDENTS */}

          <div className="admin-card">
            <h2>
              Assigned Students
            </h2>

            <ul>
              {assignedStudents.map(
                (item, index) => (
                  <li key={index}>
                    {item.student}
                    {" → "}
                    {item.bus}
                    {" | "}
                    {item.stop}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ACCOUNT */}

          <div className="admin-card">
            <h2>Account</h2>

            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;