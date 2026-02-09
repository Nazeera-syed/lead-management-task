const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

app.options("*", cors());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

