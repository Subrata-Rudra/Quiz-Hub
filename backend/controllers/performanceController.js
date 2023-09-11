const expressAsyncHandler = require("express-async-handler");
const History = require("../models/historyModel");
const Proficiency = require("../models/proficiencyModel");

const getPerformance = expressAsyncHandler(async (req, res) => {
  let uid = req.query.uid;
  let lang_id = req.query.lang_id;
  try {
    const userHistory = await History.find({
      user_id: uid,
      language_id: lang_id,
    })
      .select("score_percent accuracy")
      .sort({ createdAt: 1 });
    const performanceArray = userHistory.map((history) => ({
      score_percent: history.score_percent,
      accuracy: history.accuracy,
    }));
    const jsonContent = JSON.stringify(performanceArray);
    res.status(200).send(jsonContent);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

const getLeaderboard = expressAsyncHandler(async (req, res) => {
  let lang_id = req.query.lang_id;
  try {
    const leaderboard = await History.find({ language_id: lang_id })
      .populate("user_id", "name email")
      .select("score_percent")
      .sort({ score_percent: -1 });
    const leaderboardArray = leaderboard.map((lead) => ({
      uid: lead.user_id,
      name: lead.name,
      score_percent: lead.score_percent,
    }));
    const jsonContent = JSON.stringify(leaderboardArray);
    res.status(200).send(jsonContent);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

const getProficiency = expressAsyncHandler(async (req, res) => {
  const uid = req.query.uid;
  const proficiencyData = await Proficiency.find({ user_id: uid }).select(
    "language_id proficiencyLevel"
  );
  res.status(200).json(proficiencyData);
});

const deleteHistory = expressAsyncHandler(async (req, res) => {
  const uid = req.query.uid;
  try {
    const isDeleted = await History.deleteMany({ user_id: uid });
    await Proficiency.updateMany(
      { user_id: uid },
      { proficiencyLevel: "Apprentice" }
    );
    if (isDeleted) {
      res.status(200).send("Performance History deleted for the user");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

module.exports = {
  getPerformance,
  getLeaderboard,
  getProficiency,
  deleteHistory,
};
