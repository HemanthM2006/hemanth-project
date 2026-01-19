// backend/src/routes/soilRoutes.js
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { addSoilReport, getMySoilReports } = require("../controllers/soilController");

const router = express.Router();

router.post("/", authMiddleware, addSoilReport);
router.get("/", authMiddleware, getMySoilReports);

module.exports = router;
