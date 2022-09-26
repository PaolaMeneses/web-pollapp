import React from "react";

import {
  Box,
  Flex,
  Select,
  Stat,
  StatArrow,
  StatHelpText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import UpcomingMatch from "../components/UpcomingMatch";
import PreviousMatch from "../components/PreviousMatch";

import teams from "../assets/data/teams.json";
import useInitPage from "../hooks/useInitPage";
const matches = [
  {
    id: 1,
    local: teams[0],
    localGoals: 0,
    visitor: teams[1],
    visitorGoals: 3,
    date: "20/11",
    time: "10:00",
  },
  {
    id: 2,
    local: teams[2],
    localGoals: 1,
    visitor: teams[3],
    visitorGoals: 1,
    date: "20/11",
    time: "14:00",
  },
  {
    id: 3,
    local: teams[2],
    visitor: teams[0],
    date: "23/11",
    time: "10:00",
  },
  {
    id: 4,
    local: teams[3],
    visitor: teams[1],
    date: "23/11",
    time: "14:00",
  },
  {
    id: 5,
    local: teams[0],
    visitor: teams[3],
    date: "26/11",
    time: "10:00",
  },
  {
    id: 6,
    local: teams[2],
    visitor: teams[1],
    date: "26/11",
    time: "14:00",
  },
];

const previousMatches = [
  {
    id: 2,
    local: teams[2],
    localGoals: 1,
    localGoalPrediction: 0,
    visitor: teams[3],
    visitorGoals: 1,
    visitorGoalPrediction: 0,
    date: "20/11",
    time: "14:00",
  },
  {
    id: 1,
    local: teams[0],
    localGoals: 0,
    localGoalPrediction: null,
    visitor: teams[1],
    visitorGoals: 3,
    visitorGoalPrediction: null,
    date: "20/11",
    time: "10:00",
  },
];

function Matches() {
  useInitPage({ headerText: "Partidos", showMenu: false });
  return (
    <>
      <Flex alignItems="center">
        <Box>
          <Text as="b" fontSize="lg">
            Carton N°
          </Text>
          <Select>
            <option value="119">119</option>
            <option value="233">233</option>
            <option value="445">445</option>
          </Select>
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
              <UpcomingMatch key={match.id} match={match} />
            ))}
          </TabPanel>
          <TabPanel>
            {previousMatches.map((match) => (
              <PreviousMatch key={match.id} match={match} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default Matches;
