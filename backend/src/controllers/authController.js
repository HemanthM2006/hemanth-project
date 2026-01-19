// backend/src/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required",
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
      [fullName, email, passwordHash]
    );

    const userId = result.insertId;

    const [rows] = await pool.query(
      "SELECT id, full_name, email FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    const user = rows[0];
    const token = generateToken(user);

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Server error during registration",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const [rows] = await pool.query(
      "SELECT id, full_name, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Server error during login",
    });
  }
}

module.exports = {
  register,
  login,
};