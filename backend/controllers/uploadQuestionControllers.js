const expressAsyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");
const User = require("../models/userModel");

const uploadQuestion = expressAsyncHandler(async (req, res) => {
  const {
    uid,
    lang_id,
    category,
    desc,
    option1,
    option2,
    option3,
    option4,
    correct_answer,
  } = req.body;
  let isTeacher;
  try {
    const user = await User.findById(uid);
    isTeacher = user.isTeacher;
  } catch (error) {
    res.status(404).send(error);
  }
  if (!isTeacher) {
    res
      .status(403)
      .send(
        "You are not a teacher, you do not have the permission to upload question"
      );
  }
  if (
    !lang_id ||
    !category ||
    !desc ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !correct_answer
  ) {
    res.status(400).send("Please fill all the details to create a question");
  }
  try {
    const optionsArr = [option1, option2, option3, option4];
    const optionsString = JSON.stringify(optionsArr);
    const newQuestion = {
      language_id: lang_id.toLowerCase(),
      category: category,
      desc: desc,
      options: optionsString,
      correct_answer: correct_answer,
    };
    const isCreated = await Question.create(newQuestion);
    if (isCreated) {
      res.status(201).send("Question added");
    } else {
      res.send("Failed to add question");
    }
  } catch (error) {
    console.log("Error ocurred in uploading questions");
    throw new Error(error);
  }
});

module.exports = uploadQuestion;
