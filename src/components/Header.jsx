import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Header = (props) => {
  const { headerText = "Partidos" } = props;

  return (
    <Box
      bg="brand.500"
      textAlign="center"
      w="100%"
      p={3}
      h="3rem"
      color="white"
      mb={5}
      borderBottomStartRadius="full"
      borderBottomEndRadius="full"
    >
      <Text as="b">{headerText.toUpperCase()}</Text>
    </Box>
  );
};

export default Header;
