// backend/src/routes/testRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.get("/protected", authMiddleware, (req, res) => {
  return res.json({
    message: "Protected route working ✅",
    user: req.user,
  });
});

module.exports = router;
