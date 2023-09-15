const express = require("express");
const {
  getQuestions,
  getAnswers,
  getLanguages,
} = require("../controllers/quizControllers");
const uploadQuestion = require("../controllers/uploadQuestionControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/questions").post(protect, getQuestions);
router.route("/answers").post(protect, getAnswers);
router.route("/languages").get(protect, getLanguages);
router.route("/upload").post(protect, uploadQuestion);

module.exports = router;
