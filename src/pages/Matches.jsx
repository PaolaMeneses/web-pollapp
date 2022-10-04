import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Select,
  Spinner,
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

import { getMatches, getPreviousMatches } from "../api/matches";

function Matches() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [previousMatches, setPreviousMatches] = useState([]);

  const fetch = async () => {
    setLoading(true);
    setMatches(await getMatches());
    setPreviousMatches(await getPreviousMatches());
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
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
      <Flex alignItems="center">
        <Box>
          <Text as="b" fontSize="lg">
            Tabla N°
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
