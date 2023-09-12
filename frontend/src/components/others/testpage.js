import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Radio,
  RadioGroup,
  Button,
  Container,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./navbar";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("");
  const [lang_id, setLangId] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [languages, setLanguages] = useState([]);

  const fetchLanguages = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/quiz/languages`,
        config
      );
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching language data:", error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    const getQuestions = async (lang_id, category) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await axios.post(
          "http://localhost:5000/quiz/questions",
          {
            language_id: lang_id,
            category: category,
          },
          config
        );
        if (lang_id && category) {
          setQuestions(response.data);
        }
      } catch (err) {
        console.log("Error occurred in fetching questions from the database");
        console.log(err);
      }
    };

    getQuestions(lang_id, category);
  }, [lang_id, category]);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption,
    });
  };
  const handleSubmit = () => {
    console.log("answers are: ");
    console.log(selectedAnswers);
    alert("Submitted test");
  };

  return (
    <>
      <Navbar />
      <Container maxW="lg" py={8} d="flex" justifyContent="center" mt={12}>
        <Select
          placeholder="Select Language"
          value={lang_id}
          onChange={(e) => {
            setLangId(e.target.value);
          }}
          background="white"
          mb={5}
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language.toUpperCase()}
            </option>
          ))}
        </Select>
        <Select
          id="difficulty"
          background="white"
          mb={5}
          placeholder="Select difficulty"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Quiz of {lang_id.toUpperCase()} (LEVEL: {category.toUpperCase()})
          </Text>
          <form>
            {questions.map((question, ind) => (
              <Box
                key={question._id}
                borderWidth="1px"
                p={4}
                borderRadius="md"
                background="white"
                fontSize="xl"
                mb={5}
                width="50vw"
              >
                <Text mb={5}>
                  {ind + 1}. {question.desc}
                </Text>
                <RadioGroup
                  value={selectedAnswers[question._id] || "-1"}
                  onChange={(value) => handleOptionSelect(question._id, value)}
                  display="flex"
                  flexDirection="column"
                >
                  {JSON.parse(question.options).map((option, index) => (
                    <Radio key={index} value={toString(index)} mb={5}>
                      {option}
                    </Radio>
                  ))}
                </RadioGroup>
              </Box>
            ))}
            <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
              Submit Test
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default TestPage;
