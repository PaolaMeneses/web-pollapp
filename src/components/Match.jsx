import React from "react";
import { NavLink, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, ArrowRightIcon, MinusIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useUpdateMatchGoalsMutation } from "../api/matches";

function MatchTeam(props) {
  const { team } = props;
  return (
    <>
      <Box
      // style={{ border: ".5px solid red" }}
      >
        <Box shadow="xl" mb={2}>
          <Image loading="lazy" src={`${team.flag}`} alt="" />
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
    matchDetail,
    randomGoalsPrediction,
  } = props;
  const { localMinusGoal, localAddGoal } = handlerLocalPrediction;
  const { visitorMinusGoal, visitorAddGoal } = handlerVisitorPrediction;
  const { boardId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const allowPred = dayjs(match.date).unix() > dayjs().unix();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [handlerRequestABoard, { isLoading }] = useUpdateMatchGoalsMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const saveResultMatch = async (values) => {
    const { localGoals, visitorGoals } = values;
    console.log({ values });
    toast.closeAll();
    try {
      await handlerRequestABoard({
        match_id: match._id,
        payload: {
          localGoals,
          visitorGoals,
          localGeneralGoals: localGoals,
          visitorGeneralGoals: visitorGoals,
          isClosed: true,
        },
      }).unwrap();
      toast({
        position: "top",
        title: "Partido cerrado con exito",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        position: "top",
        title: error.data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

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
          {showPredictionBtns && allowPred && (
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
              <Box>
                <Button
                  onClick={randomGoalsPrediction}
                  aria-label="randomGoals"
                  colorScheme="brand"
                  variant="outline"
                  size="sm"
                  fontSize="smaller"
                >
                  Aleatorio
                </Button>
              </Box>
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
          {(match.isClosed || !allowPred) && !matchDetail && (
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

          {user.isAdmin && (
            <Flex
              justify="center"
              alignItems="center"
              color="brand.500"
              mb="10px"
            >
              <Button
                onClick={onOpen}
                variant="outline"
                size="sm"
                fontSize="smaller"
                colorScheme="brand"
              >
                Cerrar partido
              </Button>
            </Flex>
          )}
        </Box>
        {showPredictionBtns && allowPred && (
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
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <form onSubmit={handleSubmit(saveResultMatch)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cerrar partido</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.localGoals} mb="10px">
                <FormLabel htmlFor="localGoals">Goles local</FormLabel>
                <Input
                  id="localGoals"
                  borderRadius="25px"
                  type="number"
                  {...register("localGoals", {
                    // value: "andares@qemal.co",
                    valueAsNumber: true,
                    setValueAs: (v) => Number(v),
                    required: "Falta goles local",
                  })}
                />
                <FormErrorMessage>
                  {errors.localGoals && errors.localGoals.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.visitorGoals} mb="10px">
                <FormLabel htmlFor="visitorGoals">Goles visitantes</FormLabel>
                <Input
                  id="visitorGoals"
                  borderRadius="25px"
                  type="number"
                  {...register("visitorGoals", {
                    // value: "andares@qemal.co",
                    valueAsNumber: true,
                    setValueAs: (v) => Number(v),
                    required: "Falta goles local",
                  })}
                />
                <FormErrorMessage>
                  {errors.visitorGoals && errors.visitorGoals.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="brand"
                type="submit"
                isLoading={isSubmitting}
              >
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default Match;
