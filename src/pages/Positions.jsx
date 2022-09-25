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

import Layout from "../components/Layout";

const playerPositions = [
  {
    id: 1,
    name: "Abby Jimena Posada",
    points: 23,
  },
  {
    id: 2,
    name: "Paola Meneses Calderon",
    points: 20,
  },
  {
    id: 3,
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
              <Th>Nombre</Th>
              <Th isNumeric>Puntos</Th>
            </Tr>
          </Thead>
          <Tbody>
            {playerPositions.map((player) => (
              <Tr key={player.id}>
                <Td>{player.id}</Td>
                <Td>{player.name}</Td>
                <Td isNumeric>{player.points}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Positions;
