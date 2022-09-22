import React from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import useGoalPrediction from "../hooks/useGoalPrediction";
function MatchTeam(props) {
  const { team } = props;

  return (
    <>
      <Box
      // style={{ border: ".5px solid red" }}
      >
        <Box shadow="xl" mb={2}>
          <Image src={`./img/teams/${team.img}`} alt="" />
        </Box>
        <Text fontSize={{ base: "lg" }} as="b">
          {team.name}
        </Text>
      </Box>
    </>
  );
}

function Match(props) {
  const { match } = props;
  const [localGoalPrediction, localMinusGoal, localAddGoal] =
    useGoalPrediction(null);
  const [visitorGoalPrediction, visitorMinusGoal, visitorAddGoal] =
    useGoalPrediction(null);

  return (
    <>
      <Box
        textAlign="center"
        shadow="xl"
        borderRadius="md"
        mb={5}
        // style={{ border: ".5px solid red" }}
      >
        <Box px={3} pb={1} borderTop="red">
          <Grid templateColumns="repeat(3, 1fr)">
            <Spacer />
            <Box
              bg="brand.500"
              mb={1}
              borderBottomStartRadius="lg"
              borderBottomEndRadius="lg"
            >
              <Text color="#fff" fontSize="xs">
                {`PARTIDO ${match.id}`}
              </Text>
            </Box>
            <Spacer />
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={1}>
            <MatchTeam team={match.local} />
            <Grid
              templateRows="repeat(4, 1fr)"
              // style={{ border: ".5px solid red" }}
            >
              <GridItem rowSpan={2}>
                <Text fontSize={{ base: "40px" }}>
                  {`${match.localGoals ?? ""} - ${match.visitorGoals ?? ""}`}
                </Text>
              </GridItem>
              <GridItem rowSpan={1}>
                <Text as="i" fontSize={{ base: "15px" }}>
                  VS
                </Text>
              </GridItem>
              <GridItem rowSpan={1}>
                <Text fontSize={{ base: "20px" }}>{`${
                  localGoalPrediction ?? ""
                } - ${visitorGoalPrediction ?? ""}`}</Text>
              </GridItem>
            </Grid>
            <MatchTeam team={match.visitor} />
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" mb={3}>
            <Flex justifyContent="space-around">
              <IconButton
                onClick={localMinusGoal}
                disabled={localGoalPrediction <= 0}
                aria-label="minusGoals"
                colorScheme="red"
                size="sm"
                icon={<MinusIcon />}
              />
              <IconButton
                onClick={localAddGoal}
                aria-label="addGoals"
                colorScheme="blue"
                size="sm"
                icon={<AddIcon />}
              />
            </Flex>
            <Text>
              {match.date} {match.time}
            </Text>
            <Flex justifyContent="space-around">
              <IconButton
                onClick={visitorMinusGoal}
                disabled={visitorGoalPrediction <= 0}
                aria-label="minusGoals"
                colorScheme="red"
                size="sm"
                icon={<MinusIcon />}
              />
              <IconButton
                onClick={visitorAddGoal}
                aria-label="addGoals"
                colorScheme="blue"
                size="sm"
                icon={<AddIcon />}
              />
            </Flex>
          </Grid>
        </Box>
        <Button
          // style={{ border: ".5px solid red" }}
          colorScheme="brand"
          color="#fff"
          disabled={
            localGoalPrediction === null || visitorGoalPrediction == null
          }
          _focus={{ backgroundColor: "brand.500" }}
          w="100%"
          h={10}
          shadow="xl"
          borderRadius={0}
          borderBottomStartRadius="lg"
          borderBottomEndRadius="lg"
        >
          GUARDAR PREDICCIÓN
        </Button>
      </Box>
    </>
  );
}

export default Match;
