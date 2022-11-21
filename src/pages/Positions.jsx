import React from "react";
import {
  Flex,
  Stat,
  StatArrow,
  StatHelpText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useGetPositionsByGroupQuery } from "../api/groups";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { boardsApi } from "../api/board";

// const playerPositions = [
//   {
//     id: 1,
//     board: "1102",
//     name: "Abby Jimena Posada",
//     points: 23,
//   },
//   {
//     id: 2,
//     board: "1230",
//     name: "Paola Meneses Calderon",
//     points: 20,
//   },
//   {
//     id: 3,
//     board: "1255",
//     name: "Andrés Felipe Posada Quiroz",
//     points: 2,
//   },
// ];

const Positions = () => {
  const { boardId } = useParams();

  const { data: { group_id } = {} } = useSelector(
    boardsApi.endpoints.validateBoard.select(boardId)
  );
  const { data: playerPositions } = useGetPositionsByGroupQuery(group_id);

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Pos</Th>
              <Th isNumeric>Puntos</Th>
              <Th># Tabla - Nombre</Th>
              <Th>P3P</Th>
              <Th>P1P</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(playerPositions || []).map((board) => (
              <Tr
                key={board._id}
                color={boardId === board._id ? "brand.500" : "black"}
                style={{ ...(boardId === board._id && { fontWeight: "bold" }) }}
              >
                <Td>
                  <Flex justifyContent="flex-end">
                    {board.current_pos &&
                    board.previous_pos &&
                    board.current_pos !== board.previous_pos ? (
                      <Stat>
                        <StatHelpText fontSize="md">
                          <StatArrow
                            type={
                              board.previous_pos > board.current_pos
                                ? "increase"
                                : "decrease"
                            }
                          />
                        </StatHelpText>
                      </Stat>
                    ) : null}
                    {board.current_pos || 0}
                  </Flex>
                </Td>
                <Td isNumeric>{board.totalPoints}</Td>
                <Td>
                  {board.number} - {board.user.firstname} {board.user.lastname}
                </Td>
                <Td isNumeric>{board.predsThreePoints}</Td>
                <Td isNumeric>{board.predsOnePoints}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Positions;
