import React, { useEffect, useState } from "react";
import {
  Flex,
  IconButton,
  Input,
  Stack,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useLazyGroupListQuery } from "../api/groups";
import Group from "../components/Group";

const Home = () => {
  const [previousCode, setPreviousCode] = useState("");
  const [code, setCode] = useState("Iq7zRx");

  const [triggerGroups, { data: groups, isLoading }] = useLazyGroupListQuery();

  const getGroupByCode = (e) => {
    e.preventDefault();
    if (code.trim() && code !== previousCode) {
      triggerGroups(code);
      setPreviousCode(code);
    }
  };

  useEffect(() => {
    if (!code) {
      triggerGroups();
      setPreviousCode(code);
    }
  }, [code]);

  return (
    <>
      <form onSubmit={getGroupByCode}>
        <Flex gap={2}>
          <Input
            borderRadius={25}
            type="search"
            placeholder="Buscar grupo por código"
            variant="filled"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <IconButton
            borderRadius={25}
            colorScheme="brand"
            aria-label="Search database"
            icon={<SearchIcon />}
            type="submit"
          />
        </Flex>
      </form>
      <Stack spacing={8} mt="20px">
        {isLoading ? (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              size="xl"
            />
          </Center>
        ) : (groups || []).length === 0 ? (
          <Text>No hay grupos</Text>
        ) : (
          (groups || []).map((group) => (
            <Group key={group._id} group={group} code={code} />
          ))
        )}
      </Stack>
    </>
  );
};

export default Home;
