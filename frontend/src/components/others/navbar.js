import React from "react";
import { Box, Flex, Spacer, Link, Text, Avatar } from "@chakra-ui/react";

const Navbar = () => {
  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  };
  const linkStyle = {
    textDecoration: "none",
  };
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Flex
      align="center"
      bg="blue.500"
      p={4}
      color="white"
      fontSize="xl"
      style={navbarStyle}
    >
      <Link href="/testpage" style={linkStyle}>
        <Box display="flex" alignItems="center" mr={4}>
          <Text>Give Test</Text>
        </Box>
      </Link>
      <Link href="/performance" style={linkStyle}>
        <Box display="flex" alignItems="center" mr={4}>
          <Text>Performance</Text>
        </Box>
      </Link>
      <Link href="/leaderboard" style={linkStyle}>
        <Box display="flex" alignItems="center" mr={4}>
          <Text>Leaderboard</Text>
        </Box>
      </Link>
      <Spacer />
      <Link href="/profile" style={linkStyle}>
        <Box display="flex" alignItems="center" mr={4}>
          <Avatar size="sm" name={user.name} />
          <Text ml={2}>Profile</Text>
        </Box>
      </Link>
    </Flex>
  );
};

export default Navbar;
