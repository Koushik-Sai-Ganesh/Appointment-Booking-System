import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

const CustomerDashboard = () => {
  const { appointments } = useContext(BookingContext);
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ FILTER ONLY CURRENT USER DATA
  const myAppointments = appointments.filter(
    (a) => a.bookedBy === user?.email
  );

  return (
    <div className="page">
      <h2>Customer Dashboard</h2>

      <p>Your Appointments: {myAppointments.length}</p>
    </div>
  );
};

export default CustomerDashboard;