import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Select,
  Spinner,
  Stat,
  StatArrow,
  StatHelpText,
  Text,
  VStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useGroupByIdQuery } from "../api/groups";
import { boardsApi } from "../api/board";

const BoardHeader = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const {
    data: {
      group_id,
      _id,
      number,
      current_pos,
      previous_pos,
      totalPoints,
    } = {},
  } = useSelector(boardsApi.endpoints.validateBoard.select(boardId));

  const { data: group, isLoading } = useGroupByIdQuery(group_id);

  return (
    <VStack alignItems="space-between">
      <Flex justifyContent="space-between">
        <Text as="b" fontSize="lg">
          {group?.name}
        </Text>

        <Menu>
          <MenuButton
            style={{ margin: 0 }}
            aria-label="options"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Menu
          </MenuButton>
          <MenuList>
            <NavLink to={`/board/${_id}`}>
              <MenuItem>Tabla de predicciones</MenuItem>
            </NavLink>
            <NavLink to={`/board/${_id}/positions`}>
              <MenuItem>Posiciones</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      </Flex>
      <Flex alignItems="center">
        <Box>
          <Text as="b" fontSize="lg">
            Tabla N°
          </Text>
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
          ) : group?.active?.length > 1 ? (
            <Select
              defaultValue={_id}
              onChange={(e) => {
                navigate(`/board/${e.target.value}`);
                // dispatch(boardsApi.util.invalidateTags(["Board"]));
              }}
            >
              {group?.active?.map((boardActive) => (
                <option key={boardActive._id} value={boardActive._id}>
                  {boardActive.number}
                </option>
              ))}
            </Select>
          ) : group?.active.length ? (
            <Text textAlign="center">{group?.active?.[0].number}</Text>
          ) : null}
          {/* <Text>119</Text> */}
        </Box>
        <Stat>
          <Flex
            // style={{ border: ".5px solid red" }}
            alignItems="flex-end"
            flexDirection="column"
          >
            <Flex
              alignItems="center"
              // justifyContent="space-around"
              // style={{ border: ".5px solid red" }}
            >
              <Text verticalAlign="baseline" as="b" fontSize="2xl">
                {totalPoints}
              </Text>
              <Text ml={2}>Puntos</Text>
            </Flex>
            <StatHelpText fontSize="md">
              {current_pos && previous_pos && current_pos !== previous_pos && (
                <StatArrow
                  type={previous_pos > current_pos ? "increase" : "decrease"}
                />
              )}
              {current_pos ? "pos" : ""} {current_pos}
            </StatHelpText>
          </Flex>
        </Stat>
      </Flex>
    </VStack>
  );
};

export default BoardHeader;
