// backend/src/controllers/soilController.js
const { pool } = require("../config/db");

async function addSoilReport(req, res) {
  try {
    const userId = req.user.id;
    const { location, ph, nitrogen, phosphorus, potassium, moisture } = req.body;

    if (
      !location ||
      ph === undefined ||
      nitrogen === undefined ||
      phosphorus === undefined ||
      potassium === undefined ||
      moisture === undefined
    ) {
      return res.status(400).json({ message: "All soil fields are required" });
    }

    const [result] = await pool.query(
      `INSERT INTO soil_reports
      (user_id, location, ph, nitrogen, phosphorus, potassium, moisture)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, location, ph, nitrogen, phosphorus, potassium, moisture]
    );

    return res.status(201).json({
      message: "Soil report saved successfully",
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while saving soil report",
    });
  }
}

async function getMySoilReports(req, res) {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `SELECT id, user_id, location, ph, nitrogen, phosphorus, potassium, moisture, created_at
       FROM soil_reports
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    // IMPORTANT: frontend expects items
    return res.json({
      message: "Soil reports fetched successfully",
      items: rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching soil reports",
    });
  }
}

module.exports = {
  addSoilReport,
  getMySoilReports,
};
