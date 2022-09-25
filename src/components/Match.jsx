import React from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";

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
  const {
    match,
    type,
    showPredictionBtns,
    showMatchPoints,
    handlerLocalPrediction = {},
    handlerVisitorPrediction = {},
  } = props;
  const { localMinusGoal, localAddGoal } = handlerLocalPrediction;
  const { visitorMinusGoal, visitorAddGoal } = handlerVisitorPrediction;

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
          <Grid templateColumns="repeat(4, 1fr)">
            <Spacer />
            <GridItem
              bg="brand.500"
              mb={1}
              borderBottomStartRadius="full"
              borderBottomEndRadius="full"
              colSpan={2}
            >
              <Text color="#fff" fontSize="xs" height="18px">
                {`FASE GRUPOS GRUPO A`}
              </Text>
            </GridItem>
            <Spacer />
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={1}>
            <MatchTeam team={match.local} />
            <Grid
              templateRows="repeat(4, 1fr)"
              // style={{ border: ".5px solid red" }}
            >
              <GridItem rowSpan={2}>
                {type === "upcoming" ? (
                  <Flex
                    flexDirection="column"
                    justifyContent="flex-end"
                    // style={{ border: ".5px solid red" }}
                    color="gray"
                    h="100%"
                  >
                    <Text as="b" fontSize="lg">
                      {match.date}
                    </Text>
                    <Text fontSize="md">{match.time}</Text>
                  </Flex>
                ) : (
                  <Text fontSize={{ base: "40px" }}>
                    {`${match.localGoals ?? ""} - ${match.visitorGoals ?? ""}`}
                  </Text>
                )}
              </GridItem>
              <GridItem rowSpan={1}>
                <Text as="i" fontWeight="bold" fontSize={{ base: "15px" }}>
                  VS
                </Text>
              </GridItem>
              <GridItem rowSpan={1}>
                <Text fontSize={{ base: "20px" }}>{`${
                  match.localGoalPrediction ?? ""
                } - ${match.visitorGoalPrediction ?? ""}`}</Text>
              </GridItem>
            </Grid>
            <MatchTeam team={match.visitor} />
          </Grid>
          {showPredictionBtns && (
            <Grid templateColumns="repeat(3, 1fr)" mb={3}>
              <Flex justifyContent="space-around">
                <IconButton
                  onClick={localMinusGoal}
                  disabled={match.localGoalPrediction <= 0}
                  aria-label="minusGoals"
                  colorScheme="gray"
                  size="sm"
                  icon={<MinusIcon color="brand.500" />}
                />
                <IconButton
                  onClick={localAddGoal}
                  aria-label="addGoals"
                  colorScheme="gray"
                  size="sm"
                  icon={<AddIcon color="brand.500" />}
                />
              </Flex>
              <Spacer />
              <Flex justifyContent="space-around">
                <IconButton
                  onClick={visitorMinusGoal}
                  disabled={match.visitorGoalPrediction <= 0}
                  aria-label="minusGoals"
                  colorScheme="gray"
                  size="sm"
                  icon={<MinusIcon color="brand.500" />}
                />
                <IconButton
                  onClick={visitorAddGoal}
                  aria-label="addGoals"
                  colorScheme="gray"
                  size="sm"
                  icon={<AddIcon color="brand.500" />}
                />
              </Flex>
            </Grid>
          )}
        </Box>
        {showPredictionBtns && (
          <Button
            // style={{ border: ".5px solid red" }}
            colorScheme="brand"
            color="#fff"
            disabled={
              match.localGoalPrediction === null ||
              match.visitorGoalPrediction === null
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
        )}
        {showMatchPoints && (
          <Box
            position="relative"
            //  style={{ border: ".5px solid blue" }}
          >
            <Circle
              bg="brand.500"
              color="#fff"
              size="40px"
              rounded="full"
              position="absolute"
              bottom={-4}
              right={-3}
              shadow="lg"
            >
              <Text fontSize="xl">+0</Text>
            </Circle>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Match;
