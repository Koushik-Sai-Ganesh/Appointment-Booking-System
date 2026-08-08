import { useEffect, useState } from "react";

const SidebarInfo = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    setUsers(storedUsers);
    setAppointments(storedAppointments);
  }, []);

  const adminCount = users.filter(u => u.role === "ADMIN").length;
  const customerCount = users.filter(u => u.role === "CUSTOMER").length;

  return (
    <div className="sidebar-info">
      <h3>📊 System Info</h3>

      <p>👑 Admins: {adminCount}</p>
      <p>👤 Users: {customerCount}</p>
      <p>📅 Appointments: {appointments.length}</p>

      <hr />

      <p>✔ Secure Login</p>
      <p>✔ Role-Based Access</p>
      <p>✔ Smart Booking</p>
    </div>
  );
};

export default SidebarInfo;