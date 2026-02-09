import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  //Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.service) {
      alert("All fields are required");
      return;
    }

    await fetch("https://lead-management-backend-im11.onrender.com/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Lead submitted successfully");
    setForm({ name: "", email: "", phone: "", service: "" });
  };

  //Admin Login 
  const adminLogin = async () => {
    const res = await fetch("https://lead-management-backend-im11.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "admin123",
      }),
    });

    if (res.ok) {
      setIsAdmin(true);

      const leadsRes = await fetch("https://lead-management-backend-im11.onrender.com/api/leads");
      const data = await leadsRes.json();
      setLeads(data);
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    
       <div style={{ padding: "20px" }}>
      <h1>Business Website</h1>
      <p>We provide high-quality digital services.</p>

      {/* Lead Form */}
      <form onSubmit={submitForm}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br /><br />

        <input name="email" placeholder="Email" onChange={handleChange} />
        <br /><br />

        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <br /><br />

        <select name="service" onChange={handleChange}>
          <option value="">Select Service</option>
          <option value="Web Development">Web Development</option>
          <option value="UI/UX">UI / UX</option>
        </select>
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <hr />

      {/* Admin Panel */}
      <h2>Admin Panel</h2>

      {!isAdmin && (
        <button onClick={adminLogin}>Login as Admin</button>
      )}

      {isAdmin && (
        <div>
          <h3>Leads Dashboard</h3>

          <label>Filter by Service: </label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Web Development">Web Development</option>
            <option value="UI/UX">UI / UX</option>
          </select>

          <ul>
            {leads
              .filter((l) => (filter ? l.service === filter : true))
              .map((lead, index) => (
                <li key={index}>
                  {lead.name} – {lead.email} – {lead.phone} – {lead.service}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
