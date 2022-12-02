import React, { useEffect, useState } from "react";
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

import { useGetActiveMatchesQuery } from "../api/matches";
import Match from "../components/Match";
import { useTeamListQuery } from "../api/teams";

function Matches() {
  const [previousMatches, setPreviousMatches] = useState([]);

  const { data: matches, isLoading } = useGetActiveMatchesQuery();
  const { data: teams, isLoading: isLoadingTeams } = useTeamListQuery();

  if (isLoading || isLoadingTeams) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
      </Center>
    );
  }

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
            {matches.map((match) => (
              <Match key={match._id} type="matches" match={match} />
            ))}
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

export default Matches;
