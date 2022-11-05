import React from "react";
import { useParams } from "react-router-dom";
import {
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import UpcomingMatch from "../components/UpcomingMatch";
import PreviousMatch from "../components/PreviousMatch";

import {
  useGetBoardActiveDetailQuery,
  useGetBoardClosedDetailQuery,
} from "../api/board";

function Board() {
  const { boardId } = useParams();

  const {
    data,
    isLoading: upcoingMatchesLoading,
    isFetching: upcoingMatchesFetching,
  } = useGetBoardActiveDetailQuery(boardId);

  const {
    data: previousBoardMatches,
    isLoading: previousBoardMatchesLoading,
    isFetching: previousBoardMatchesFetching,
  } = useGetBoardClosedDetailQuery(boardId);

  const { predictions: upcoingMatches } = data || {};
  const { predictions: previousMatches } = previousBoardMatches || {};
  return (
    <>
      <Tabs colorScheme="brand" isFitted>
        <TabList mb="1em">
          <Tab>
            <Text as="b">Próximos</Text>
          </Tab>
          <Tab>
            <Text as="b">Anteriores</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {upcoingMatchesLoading || upcoingMatchesFetching ? (
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
              (upcoingMatches || []).map((pred) => (
                <UpcomingMatch key={pred._id} pred={pred} />
              ))
            )}
          </TabPanel>
          <TabPanel>
            {previousBoardMatchesLoading || previousBoardMatchesFetching ? (
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
              (previousMatches || []).map((pred) => (
                <PreviousMatch key={pred._id} pred={pred} />
              ))
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default Board;
