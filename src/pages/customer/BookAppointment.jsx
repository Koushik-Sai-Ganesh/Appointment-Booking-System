import { useContext, useState, useEffect } from "react";
import { BookingContext } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const { addAppointment } = useContext(BookingContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    type: "",
    date: "",
    time: "",
    notes: ""
  });

  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null); // 🔥 NEW
  const [loading, setLoading] = useState(false);

  // 📌 LOAD TYPES
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("appointmentTypes")) || [];
    setTypes(stored);
  }, []);

  // 📌 HANDLE INPUT
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 📌 HANDLE TYPE SELECT (IMPORTANT)
  const handleTypeChange = (e) => {
    const value = e.target.value;

    setForm({ ...form, type: value });

    const selected = types.find((t) => t.name === value);
    setSelectedType(selected); // 🔥 store full object
  };

  // 📌 VALIDATION
  const isPastDateTime = () => {
    const selected = new Date(`${form.date}T${form.time}`);
    return selected < new Date();
  };

  // 📌 SUBMIT
  const handleSubmit = () => {
    if (!form.name || !form.date || !form.time || !form.type) {
      alert("⚠ Please fill all required fields");
      return;
    }

    if (isPastDateTime()) {
      alert("⛔ Cannot book past date/time");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addAppointment({
        id: Date.now(),
        ...form,
        availability: selectedType?.availability, // 🔥 NEW
        instructions: selectedType?.instructions, // 🔥 NEW
        bookedBy: user?.email,
        status: "upcoming"
      });

      setLoading(false);
      navigate("/customer/success");
    }, 1000);
  };

  return (
    <div className="page">
      <h2>Book Appointment</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input value={form.email} disabled />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      {/* 🔥 TYPE DROPDOWN */}
      <select
        name="type"
        value={form.type}
        onChange={handleTypeChange}
      >
        <option value="">Select Type</option>
        {types.map((t) => (
          <option key={t.id} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      {/* 🔥 SHOW DETAILS */}
      {selectedType && (
        <div className="card">
          <p><b>⏱ Availability:</b> {selectedType.availability}</p>
          <p><b>📝 Instructions:</b> {selectedType.instructions}</p>
        </div>
      )}

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "⏳ Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
};

export default BookAppointment;