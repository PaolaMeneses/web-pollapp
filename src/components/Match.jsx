import React from "react";
import { AddIcon, ArrowRightIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { NavLink, useParams } from "react-router-dom";

function MatchTeam(props) {
  const { team } = props;
  return (
    <>
      <Box
      // style={{ border: ".5px solid red" }}
      >
        <Box shadow="xl" mb={2}>
          <Image src={`${team.flag}`} alt="" />
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
    handlerUpdatePrediction,
    updatePredictionLoading,
    updatePredictionDisabled,
  } = props;
  const { localMinusGoal, localAddGoal } = handlerLocalPrediction;
  const { visitorMinusGoal, visitorAddGoal } = handlerVisitorPrediction;

  const { boardId } = useParams();

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
          <Grid templateColumns="repeat(5, 1fr)">
            <Spacer />
            <GridItem
              bg="brand.500"
              mb={1}
              borderBottomStartRadius="full"
              borderBottomEndRadius="full"
              colSpan={3}
            >
              <Text color="#fff" fontSize={{ base: ".6em" }}>
                {match.phase.toUpperCase()}
              </Text>
            </GridItem>
            <Spacer />
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={1}>
            <MatchTeam team={match.localTeam} />
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
                      {dayjs(match.date).format("DD/MM")}
                    </Text>
                    <Text fontSize="md">
                      {" "}
                      {dayjs(match.date).format("HH:mm")}
                    </Text>
                  </Flex>
                ) : (
                  <Text fontSize={{ base: "35px" }}>
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
            <MatchTeam team={match.visitorTeam} />
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
          {match.isClosed && (
            <Flex
              justify="center"
              alignItems="center"
              color="brand.500"
              mb="10px"
            >
              <Link
                as={NavLink}
                color="brand.500"
                to={`/board/${boardId}/match/${match._id}`}
              >
                Ver detalle
                <ArrowRightIcon mx="4px" />
              </Link>
            </Flex>
          )}
        </Box>
        {showPredictionBtns && (
          <Button
            // style={{ border: ".5px solid red" }}
            colorScheme="brand"
            color="#fff"
            disabled={updatePredictionDisabled}
            _focus={{ backgroundColor: "brand.500" }}
            w="100%"
            h={10}
            shadow="xl"
            borderRadius={0}
            borderBottomStartRadius="lg"
            borderBottomEndRadius="lg"
            onClick={handlerUpdatePrediction}
            isLoading={updatePredictionLoading}
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
              <Text fontSize="xl">+{match.points}</Text>
            </Circle>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Match;
