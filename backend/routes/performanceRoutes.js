const express = require("express");
const {
  getPerformance,
  getLeaderboard,
  getProficiency,
  deleteHistory,
} = require("../controllers/performanceController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getPerformance);
router.route("/leaderboard").get(protect, getLeaderboard);
router.route("/proficiency").get(protect, getProficiency);
router.route("/deletehistory").get(protect, deleteHistory);

module.exports = router;
