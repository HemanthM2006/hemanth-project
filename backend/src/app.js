// backend/src/app.js

const express = require("express");
const cors = require("cors");
const soilRoutes = require("./routes/soilRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://hemanthm2006.github.io",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/soil", soilRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Smart Agriculture Platform Backend is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "smart-agriculture-platform-backend",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app;
