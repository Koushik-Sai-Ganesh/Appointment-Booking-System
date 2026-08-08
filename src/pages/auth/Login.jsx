import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    const loggedUser = login(email, password);

    if (!loggedUser) {
      setError("Invalid email or password ❌");
      return;
    }

    // ✅ ROLE BASED REDIRECT
    if (loggedUser.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/customer");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/signup">Signup</Link>
      </p>
      </div>
    </div>
  );
};

export default Login;