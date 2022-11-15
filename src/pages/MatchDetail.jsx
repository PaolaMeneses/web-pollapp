import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Center,
  Spinner,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { boardsApi } from "../api/board";
import {
  useGetMatchByIdQuery,
  useGetMatchPredictionsByIdQuery,
} from "../api/matches";
import Match from "../components/Match";

const MatchDetail = () => {
  const { boardId, matchId } = useParams();
  const { data: { group_id } = {} } = useSelector(
    boardsApi.endpoints.validateBoard.select(boardId)
  );

  const { data: match } = useGetMatchByIdQuery(matchId);
  const {
    data: preds,
    isLoading: predsIsLoading,
    isFetching: predsIsFetching,
  } = useGetMatchPredictionsByIdQuery({ matchId, group_id });

  console.log("data :>> ", match);
  console.log("preds :>> ", preds);
  return (
    <>
      {match && (
        <Box mt="15px">
          <Match match={{ ...match, isClosed: false }} matchDetail />
        </Box>
      )}

      <Tabs colorScheme="brand" isFitted>
        <TabList mb="1em">
          {match?.isClosed && (
            <Tab>
              <Text as="b">Detalle</Text>
            </Tab>
          )}
          <Tab>
            <Text as="b">Predicciones</Text>
          </Tab>
        </TabList>
        <TabPanels>
          {match?.isClosed && <TabPanel></TabPanel>}
          <TabPanel>
            {predsIsLoading || predsIsFetching ? (
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
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Local</Th>
                      <Th>Visitante</Th>
                      <Th># Tabla - Nombre</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {(preds || []).map((pred) => (
                      <Tr
                        key={pred._id}
                        color={
                          boardId === pred.board_id ? "brand.500" : "black"
                        }
                        style={{
                          ...(boardId === pred.board_id && {
                            fontWeight: "bold",
                          }),
                        }}
                      >
                        <Td>{pred.localGoalPrediction ?? "-"}</Td>
                        <Td>{pred.visitorGoalPrediction ?? "-"}</Td>
                        <Td>
                          {pred.board.number} - {pred.board.user.firstname}{" "}
                          {pred.board.user.lastname}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MatchDetail;
