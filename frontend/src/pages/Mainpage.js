import React from "react";
import { Box, Center, Heading, Text, Button, Image } from "@chakra-ui/react";
import Navbar from "../components/others/navbar";

const Mainpage = () => {
  return (
    <>
      <Navbar />
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        bgGradient="linear(to-b, teal.200, teal.400)"
        width="100vw"
      >
        <Heading as="h1" fontSize="5xl" color="white" mb={4}>
          Welcome to the Language Learning Quiz App!
        </Heading>
        <Text fontSize="2xl" color="white" textAlign="center" mb={8}>
          Improve your language skills through fun quizzes.
        </Text>
      </Box>
    </>
  );
};

export default Mainpage;
