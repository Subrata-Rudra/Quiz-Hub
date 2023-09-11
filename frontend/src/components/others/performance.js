import React, { useState, useEffect } from "react";
import { Box, Text, Button, Select } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./navbar";
import { Line } from "react-chartjs-2";

const PerformanceGraph = () => {
  const [lang_id, setLangId] = useState("");
  const [performanceData, setPerformanceData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [chartData, setChartData] = useState({
    labels: [], // Labels for X-axis (e.g., 1, 2, 3, ...)
    datasets: [
      {
        label: "Score Percent",
        data: [], // Score Percent values (e.g., 100, 50, 50, ...)
        fill: false,
        borderColor: "teal", // Line color
      },
    ],
  });

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
      console.log("Fetched languages:", response.data);
    } catch (error) {
      console.error("Error fetching language data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/performance?uid=${userInfo._id}&lang_id=${lang_id}`,
        config
      );
      setPerformanceData(response.data);
      updateChartData();
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  const updateChartData = (performanceData) => {
    const labels = performanceData.map((item, index) => index + 1); // Create labels (1, 2, 3, ...)
    const scorePercentData = performanceData.map((item) => item.score_percent);

    setChartData({
      ...chartData,
      labels: labels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: scorePercentData,
        },
      ],
    });
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    console.log("lang_id is : " + lang_id);
    if (lang_id) {
      fetchData();
    }
  }, [lang_id]);

  useEffect(() => {
    console.log("Performance data is : ", performanceData);
  }, [performanceData]);

  return (
    <>
      <Navbar />

      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        background="white"
        textAlign="center"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4} mt={12} pt={5}>
          Performance Graph
        </Text>
        <Select
          placeholder="Select Language"
          value={lang_id}
          onChange={(e) => setLangId(e.target.value)}
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language.toUpperCase()}
            </option>
          ))}
        </Select>
        <Button
          colorScheme="teal"
          mt={4}
          onClick={fetchData}
          isDisabled={!lang_id}
        >
          Get Performance Graph
        </Button>
        {/* Display performance graph here using the data from `performanceData` */}
        {/* <Line data={performanceData} options={{ maintainAspectRatio: false }} /> */}
      </Box>
    </>
  );
};

export default PerformanceGraph;
