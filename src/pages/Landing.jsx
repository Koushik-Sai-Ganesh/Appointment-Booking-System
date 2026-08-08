import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
        <div className="auth-boxs">
      <h1>📅 Appointment Booking System</h1>
      <br />
      <p>Smart scheduling with role-based dashboards and modern UI.</p>
<br />
      <div className="landing-actions">
        <button onClick={() => navigate("/login")}>Login</button>
        
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      </div>
    </div>
  );
};

export default Landing;