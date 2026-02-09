import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.service) {
      alert("All fields are required");
      return;
    }

    await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Lead submitted successfully");
    setForm({ name: "", email: "", phone: "", service: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Business Website</h1>
      <p>We provide high-quality digital services.</p>

      <form onSubmit={submitForm}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <br /><br />

        <select name="service" onChange={handleChange}>
          <option value="">Select Service</option>
          <option value="Web Development">Web Development</option>
          <option value="UI/UX">UI / UX</option>
        </select>
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
