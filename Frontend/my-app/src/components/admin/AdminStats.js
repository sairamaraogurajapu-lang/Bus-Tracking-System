function AdminStats({
  totalBuses,
  totalDrivers,
  totalStudents,
  totalRoutes,
  totalStops,
}) {
  return (
    <div className="card">
      <h2>Admin Statistics</h2>

      <p>
        Total Buses:
        {" "}
        {totalBuses}
      </p>

      <p>
        Total Drivers:
        {" "}
        {totalDrivers}
      </p>

      <p>
        Total Students:
        {" "}
        {totalStudents}
      </p>

      <p>
        Total Routes:
        {" "}
        {totalRoutes}
      </p>

      <p>
        Total Stops:
        {" "}
        {totalStops}
      </p>
    </div>
  );
}

export default AdminStats;