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

import { useGetBoardActiveDetailQuery } from "../api/board";

function Board() {
  const { boardId } = useParams();

  const {
    data,
    isLoading: upcoingMatchesLoading,
    isFetching: upcoingMatchesFetching,
  } = useGetBoardActiveDetailQuery(boardId);
  const { predictions: upcoingMatches } = data || {};
  console.log("upcoingMatchesLoading", upcoingMatchesLoading);
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
              upcoingMatches.map((pred) => (
                <UpcomingMatch key={pred._id} pred={pred} />
              ))
            )}
          </TabPanel>
          <TabPanel>
            {/* {previousMatches.map((match) => (
              <PreviousMatch key={match.id} match={match} />
            ))} */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default Board;
