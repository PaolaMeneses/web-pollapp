import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";

const Group = ({ group }) => {
  const [board, setBoard] = useState(group?.active?.[0]?._id);

  return (
    <Box key={group._id} shadow="md">
      <Flex
        h="180px"
        justifyContent="center"
        // border=".1px solid red"
      >
        <Image
          // border=".1px solid red"
          w="100%"
          objectFit="cover"
          src="https://ik.imagekit.io/apoyomibarrio/teams/vecteezy_mondial-fifa-world-cup-qatar-2022-official-logo-champion_8785666_pLGTuGxiC.jpg"
        ></Image>
      </Flex>
      <Box
        p={5}
        borderBottomRadius="5px"
        // border=".1px solid red"
      >
        <HStack justifyContent="space-between">
          <Heading fontSize="xl">Grupo familiar</Heading>
          <Text fontSize={20}>{group.code}</Text>
        </HStack>
        {(group.active || []).length === 0 && group.pending === 0 && (
          <Flex justifyContent="flex-end" mt={4}>
            <Button
              colorScheme="brand"
              variant="outline"
              onClick={() => console.log("click")}
            >
              Pedir una tabla
            </Button>
          </Flex>
        )}
        {(group.active || []).length > 0 && (
          <Flex justifyContent="space-between" align="flex-end" mt={4}>
            <Box w="30%">
              <Text as="b" fontSize="lg">
                Tabla N°
              </Text>
              <Select
                onChange={(e) => {
                  console.log(e);
                  setBoard(e.target.value);
                }}
                value={board}
              >
                {group.active.map((boardActive) => (
                  <option key={boardActive._id} value={boardActive._id}>
                    {boardActive.number}
                  </option>
                ))}
              </Select>
            </Box>
            <NavLink color="brand.500" to={`/board/${board}`}>
              Ver tabla de predicciones
            </NavLink>
            <ArrowRightIcon mx="2px" />
          </Flex>
        )}
        {(group.active || []).length === 0 && group.pending > 0 && (
          <Flex justifyContent="flex-end" mt={4}>
            <Text color="orange">Tabla pendiente por activar</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Group;
