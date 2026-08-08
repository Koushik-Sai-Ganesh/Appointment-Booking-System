import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

const AppointmentList = () => {
  const { appointments } = useContext(BookingContext);
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ ROLE BASED FILTER
  const filteredAppointments =
    user?.role === "ADMIN"
      ? appointments // admin sees all
      : appointments.filter((a) => a.bookedBy === user?.email); // customer sees own

  return (
    <div className="page">
      <h2>Appointments</h2>

      {filteredAppointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        filteredAppointments.map((appt) => (
          <div className="card" key={appt.id}>
            <p><b>Name:</b> {appt.name}</p>
            <p><b>Email:</b> {appt.email}</p>
            <p><b>Date:</b> {appt.date}</p>
            <p><b>Time:</b> {appt.time}</p>
            <p><b>Status:</b> {appt.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentList;