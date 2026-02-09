const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "https://lead-management-task.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
             
app.use(express.json());      

// ✅ Dummy in-memory data
let leads = [];

// ✅ Create lead
app.post("/api/leads", (req, res) => {
  const lead = req.body;

  if (!lead.name || !lead.email || !lead.phone || !lead.service) {
    return res.status(400).json({ message: "All fields are required" });
  }

  leads.push(lead);
  res.status(200).json({ message: "Lead created successfully" });
});

// ✅ Fetch all leads
app.get("/api/leads", (req, res) => {
  res.status(200).json(leads);
});

// ✅ Simple admin login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
