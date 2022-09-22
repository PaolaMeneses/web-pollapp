import React from "react";

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Match from "../components/Match";
import UpcomingMatch from "../components/UpcomingMatch";
import PreviousMatch from "../components/PreviousMatch";
import Layout from "../components/Layout";

import teams from "../assets/data/teams.json";
const matches = [
  {
    id: 1,
    local: teams[0],
    localGoals: 0,
    visitor: teams[1],
    visitorGoals: 3,
    date: "20 Nov 2022",
    time: "10:00",
  },
  {
    id: 2,
    local: teams[2],
    localGoals: 1,
    visitor: teams[3],
    visitorGoals: 1,
    date: "20 Nov 2022",
    time: "14:00",
  },
  {
    id: 3,
    local: teams[2],
    visitor: teams[0],
    date: "23 Nov 2022",
    time: "10:00",
  },
  {
    id: 4,
    local: teams[3],
    visitor: teams[1],
    date: "23 Nov 2022",
    time: "14:00",
  },
  {
    id: 5,
    local: teams[0],
    visitor: teams[3],
    date: "26 Nov 2022",
    time: "10:00",
  },
  {
    id: 6,
    local: teams[2],
    visitor: teams[1],
    date: "26 Nov 2022",
    time: "14:00",
  },
];

function Matches() {
  return (
    <Layout>
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
              <Match key={match.id} match={match} />
            ))}
          </TabPanel>
          <TabPanel>
            {matches.map((match) => (
              <PreviousMatch key={match.id} match={match} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

export default Matches;
