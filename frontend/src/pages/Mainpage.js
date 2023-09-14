import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Navbar from "../components/others/navbar";

const Mainpage = () => {
  return (
    <>
      <Navbar />
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        textAlign="center"
        flexDirection="column"
        bgGradient="linear(to-b, teal.200, teal.400)"
        mx={{ base: "0", md: "auto" }}
        p={4}
      >
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "5xl" }}
          color="white"
          mb={4}
        >
          Welcome to the Language Learning Quiz App!
        </Heading>
        <Text fontSize={{ base: "xl", md: "2xl" }} color="white" mb={8}>
          Improve your language skills through fun quizzes.
        </Text>
      </Box>
    </>
  );
};

export default Mainpage;
