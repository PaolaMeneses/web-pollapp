import React from "react";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Home = () => {
  return (
    <>
      <Flex gap={2}>
        <Input
          borderRadius={25}
          type="search"
          placeholder="Buscar grupo por código"
          variant="filled"
        />
        <IconButton
          borderRadius={25}
          colorScheme="blue"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </Flex>
    </>
  );
};

export default Home;
