import React from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const playerPositions = [
  {
    id: 1,
    board: "1102",
    name: "Abby Jimena Posada",
    points: 23,
  },
  {
    id: 2,
    board: "1230",
    name: "Paola Meneses Calderon",
    points: 20,
  },
  {
    id: 3,
    board: "1255",
    name: "Andrés Felipe Posada Quiroz",
    points: 2,
  },
];

const Positions = () => {
  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Pos</Th>
              <Th isNumeric>Puntos</Th>
              <Th>Nombre</Th>
            </Tr>
          </Thead>
          <Tbody>
            {playerPositions.map((player) => (
              <Tr key={player.id}>
                <Td>{player.id}</Td>
                <Td isNumeric>{player.points}</Td>
                <Td>
                  {player.board} - {player.name}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Positions;
