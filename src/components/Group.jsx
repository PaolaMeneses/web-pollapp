import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  VStack,
} from "@chakra-ui/react";
import { useRequestABoardMutation } from "../api/board";
import { groupsApi } from "../api/groups";

const Group = ({ group }) => {
  const dispatch = useDispatch();
  const { _id: user_id } = useSelector((state) => state.auth.user);
  const [board, setBoard] = useState(group?.active?.[0]?._id);

  const [handlerRequestABoard, { isLoading }] = useRequestABoardMutation();

  const requestABoard = async (group_id) => {
    const data = await handlerRequestABoard({ group_id, user_id }).unwrap();
    dispatch(
      groupsApi.util.updateQueryData("groupList", undefined, (groupsDraft) => {
        groupsDraft.map((group) =>
          group._id === group_id
            ? { ...group, pending: (group.pending += 1) }
            : group
        );
      })
    );
    console.log("data :>> ", data);
  };

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
          <Heading fontSize="xl">{group.name}</Heading>
          <Text fontSize={20}>{group.code}</Text>
        </HStack>
        {(group.active || []).length > 0 && (
          <VStack align="flex-start" mt={4}>
            <Flex>
              <Text as="b" fontSize="lg">
                Tabla N°
              </Text>
            </Flex>
            <Flex justifyContent="space-between" align="center" w="100%">
              <Box>
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
              <Box>
                <NavLink color="brand.500" to={`/board/${board}`}>
                  Ver tabla de predicciones
                </NavLink>
                <ArrowRightIcon mx="4px" />
              </Box>
            </Flex>
          </VStack>
        )}
        {group.pending === 0 && (
          <Flex justifyContent="flex-end" mt={4}>
            <Button
              isLoading={isLoading}
              colorScheme="brand"
              variant="outline"
              onClick={() => requestABoard(group._id)}
            >
              Pedir una tabla
            </Button>
          </Flex>
        )}
        {group.pending > 0 && (
          <Flex justifyContent="flex-end" mt={4}>
            <Text color="orange">Tabla pendiente por activar</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Group;
