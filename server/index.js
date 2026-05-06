require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: 'https://your-site-name.netlify.app' // Replace with your actual Netlify URL
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ===== DATABASE CONNECTION =====
mongoose
  .connect(process.env.MONGO_URI) // ✅ no old options
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ===== PORT =====
const PORT = 5000;

// ===== SCHEMA =====
const PortfolioSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    about: String,
    education: String,
    template: String,
    contact: Object,
    image: String,
    skills: Array,
    projects: Array,
    certifications: Array,
    languages: Array,
    experience: Array,
    awards: Array,
    interests: Array,
    achievements: Array,
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

// ===== ROUTES =====

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// SAVE DATA
app.post("/save", async (req, res) => {
  try {
    const newData = new Portfolio(req.body);
    await newData.save();

    res.json({ success: true, message: "Saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Save failed" });
  }
});

// GET LATEST DATA
app.get("/get", async (req, res) => {
  try {
    const latest = await Portfolio.findOne().sort({ createdAt: -1 });
    res.json(latest || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// OPTIONAL: GET ALL DATA
app.get("/get-all", async (req, res) => {
  try {
    const data = await Portfolio.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
