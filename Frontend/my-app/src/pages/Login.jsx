import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "admin") {
      navigate("/admin");
    }

    if (role === "driver") {
      navigate("/driver");
    }

    if (role === "student") {
      navigate("/student");
    }
  };

  return (
    <div className="container">
      <h1>School Bus Tracking System</h1>

      <div className="card">
        <button onClick={() => handleLogin("admin")}>
          Login as Admin
        </button>

        <button onClick={() => handleLogin("driver")}>
          Login as Driver
        </button>

        <button onClick={() => handleLogin("student")}>
          Login as Student
        </button>
      </div>
    </div>
  );
}

export default Login;