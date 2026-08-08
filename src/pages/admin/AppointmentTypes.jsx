import { useState, useEffect } from "react";

const AppointmentTypes = () => {
  const [form, setForm] = useState({
    name: "",
    availability: "",
    instructions: ""
  });

  const [types, setTypes] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("appointmentTypes")) || [];
    setTypes(stored);
  }, []);

  const saveTypes = (updated) => {
    setTypes(updated);
    localStorage.setItem("appointmentTypes", JSON.stringify(updated));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addType = () => {
    if (!form.name.trim()) {
      alert("Enter type name");
      return;
    }

    const newType = {
      id: Date.now(),
      ...form
    };

    saveTypes([...types, newType]);

    setForm({
      name: "",
      availability: "",
      instructions: ""
    });
  };

  const deleteType = (id) => {
    const updated = types.filter((t) => t.id !== id);
    saveTypes(updated);
  };

  return (
    <div className="page">
      <h2>Appointment Types (Admin)</h2>

      {/* FORM */}
      <input
        name="name"
        placeholder="Type (Doctor, Meeting...)"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="availability"
        placeholder="Availability (e.g. 10AM - 5PM)"
        value={form.availability}
        onChange={handleChange}
      />

      <textarea
        name="instructions"
        placeholder="Instructions for customer"
        value={form.instructions}
        onChange={handleChange}
      />

      <button onClick={addType}>Add Type</button>

      {/* LIST */}
      {types.map((t) => (
        <div key={t.id} className="card">
          <p><b>{t.name}</b></p>
          <p>⏱ {t.availability}</p>
          <p>📝 {t.instructions}</p>

          <button onClick={() => deleteType(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentTypes;