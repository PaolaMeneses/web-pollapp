import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import { useGroupByIdQuery } from "../api/groups";
import { boardsApi } from "../api/board";

const BoardHeader = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { data: { group_id, _id, number } = {} } = useSelector(
    boardsApi.endpoints.validateBoard.select(boardId)
  );
  const { data: group, isLoading } = useGroupByIdQuery(group_id);

  return (
    <Flex alignItems="center">
      <Box>
        <Text as="b" fontSize="lg">
          Tabla N° {number}
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
        ) : (
          group?.active?.length > 0 && (
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
          )
        )}
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
              9
            </Text>
            <Text ml={2}>Puntos</Text>
          </Flex>
          <StatHelpText fontSize="md">
            <StatArrow type="increase" />
            pos 3
          </StatHelpText>
        </Flex>
      </Stat>
    </Flex>
  );
};

export default BoardHeader;
