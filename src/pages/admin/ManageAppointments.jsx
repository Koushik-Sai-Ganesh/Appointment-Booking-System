import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

const ManageAppointments = () => {
  const { appointments, completeAppointment } = useContext(BookingContext);

  return (
    <>
      <h2>Manage Appointments</h2>
      {appointments.map(a => (
        <div key={a.id} className="card">
          <p>{a.name} - {a.date}</p>
          {a.status === "upcoming" && (
            <button onClick={()=>completeAppointment(a.id)}>Complete</button>
          )}
        </div>
      ))}
    </>
  );
};

export default ManageAppointments;