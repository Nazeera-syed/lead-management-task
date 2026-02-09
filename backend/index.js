const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy in-memory data
let leads = [];

// Create lead
app.post("/api/leads", (req, res) => {
  leads.push(req.body);
  res.json({ message: "Lead created successfully" });
});

// Fetch all leads
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

// Simple admin login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
