import { createContext, useState, useEffect } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

  // ✅ LOAD FROM STORAGE
  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem("appointments")) || [];
  });

  // ✅ SAVE TO STORAGE
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // ✅ ADD APPOINTMENT
  const addAppointment = (appointment) => {
    const expiryTime = new Date(
      `${appointment.date}T${appointment.time}`
    ).getTime();

    setAppointments((prev) => [
      ...prev,
      {
        ...appointment,
        expiryTime,
        status: "upcoming", // ✅ default state
      },
    ]);
  };

  // ✅ COMPLETE APPOINTMENT
  const completeAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "completed" } : appt
      )
    );
  };

  // 🔥 STEP 1: MARK EXPIRED
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      setAppointments((prev) =>
        prev.map((appt) => {
          if (appt.expiryTime <= now && appt.status === "upcoming") {
            return { ...appt, status: "expired" };
          }
          return appt;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 STEP 2: DELETE EXPIRED AFTER DELAY
  useEffect(() => {
    const interval = setInterval(() => {
      setAppointments((prev) =>
        prev.filter((appt) => appt.status !== "expired")
      );
    }, 10000); // delete after 10 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <BookingContext.Provider
      value={{ appointments, addAppointment, completeAppointment }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;