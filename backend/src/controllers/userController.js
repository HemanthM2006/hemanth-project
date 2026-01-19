// backend/src/controllers/userController.js
const { pool } = require("../config/db");

async function getMe(req, res) {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      "SELECT id, full_name, email, created_at FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];

    return res.json({
      message: "User profile fetched successfully",
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching profile",
    });
  }
}

module.exports = {
  getMe,
};
