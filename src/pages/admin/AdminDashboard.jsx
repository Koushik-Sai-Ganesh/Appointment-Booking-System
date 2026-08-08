import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

const AdminDashboard = () => {
  const { appointments } = useContext(BookingContext);

  return (
    <>
      <h2>Admin Dashboard</h2>
      <p>Total Appointments: {appointments.length}</p>
    </>
  );
};

export default AdminDashboard;