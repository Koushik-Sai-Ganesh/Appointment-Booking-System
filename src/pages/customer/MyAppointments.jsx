import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

const MyAppointments = () => {
  const { appointments } = useContext(BookingContext);
  const user = JSON.parse(localStorage.getItem("user"));

const myAppointments = appointments.filter(
  (a) => a.bookedBy === user?.email
);

  return (
    <div className="page">
      <h2>My Appointments</h2>

      {myAppointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        myAppointments.map((a) => (
          <div key={a.id} className="card">
            <p><b>Name:</b> {a.name}</p>
            <p><b>Date:</b> {a.date}</p>
            <p><b>Time:</b> {a.time}</p>
            <p><b>Status:</b> {a.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;