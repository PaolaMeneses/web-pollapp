import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRequestABoardMutation } from "../api/board";
import { groupsApi } from "../api/groups";

const Group = ({ group, code }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { _id: user_id } = useSelector((state) => state.auth.user);
  const [board, setBoard] = useState(group?.active?.[0]?._id);

  const [handlerRequestABoard, { isLoading }] = useRequestABoardMutation();

  const onBeforeRequestABoard = () => {
    if (group?.active?.length >= 1) {
      onOpen();
    } else {
      requestABoard();
    }
  };

  const requestABoard = async () => {
    try {
      await handlerRequestABoard({ group_id: group._id, user_id }).unwrap();
      const param = code || undefined;
      dispatch(
        groupsApi.util.updateQueryData("groupList", param, (groupsDraft) => {
          return groupsDraft.map((g) => {
            return g._id === group._id ? { ...g, pending: g.pending + 1 } : g;
          });
        })
      );
    } catch (error) {}
    onClose();
  };

  return (
    <>
      <Box key={group._id} shadow="md">
        <Flex
          h="180px"
          justifyContent="center"
          // border=".1px solid red"
        >
          <Image
            // border=".1px solid red"
            w="100%"
            objectFit="cover"
            src="https://ik.imagekit.io/apoyomibarrio/teams/vecteezy_mondial-fifa-world-cup-qatar-2022-official-logo-champion_8785666_pLGTuGxiC.jpg"
          ></Image>
        </Flex>
        <Box
          p={5}
          borderBottomRadius="5px"
          // border=".1px solid red"
        >
          <HStack justifyContent="space-between">
            <Heading fontSize="xl">{group.name}</Heading>
            <Text fontSize={20}>{group.code}</Text>
          </HStack>
          {(group.active || []).length > 0 && (
            <VStack align="flex-start" mt={4}>
              <Grid templateColumns="repeat(5, 1fr)" w="100%">
                <GridItem colSpan={2} textAlign="center">
                  <Text as="b" fontSize="lg">
                    Tabla N°
                  </Text>
                </GridItem>
                <GridItem colSpan={3}></GridItem>
                <GridItem colSpan={2}>
                  {(group.active || []).length === 1 ? (
                    <Center>
                      <Text>{group.active[0].number}</Text>
                    </Center>
                  ) : (
                    <Select
                      onChange={(e) => {
                        setBoard(e.target.value);
                      }}
                      value={board}
                    >
                      {group.active.map((boardActive) => (
                        <option key={boardActive._id} value={boardActive._id}>
                          {boardActive.number}
                        </option>
                      ))}
                    </Select>
                  )}
                </GridItem>
                <GridItem colSpan={3} width="100%">
                  <Flex
                    alignItems="center"
                    h="100%"
                    justifyContent="flex-end"
                    textAlign="right"
                  >
                    <NavLink color="brand.500" to={`/board/${board}`}>
                      Ver tabla de predicciones
                    </NavLink>
                    <ArrowRightIcon ml="8px" />
                  </Flex>
                </GridItem>
              </Grid>
            </VStack>
          )}
          {group.pending === 0 && (
            <Flex justifyContent="flex-end" mt={4}>
              <Button
                isLoading={isLoading}
                colorScheme="brand"
                variant="outline"
                onClick={() => onBeforeRequestABoard()}
              >
                Pedir una tabla
              </Button>
            </Flex>
          )}
          {group.pending > 0 && (
            <Flex justifyContent="flex-end" mt={4}>
              <Text color="orange">Tabla pendiente por activar</Text>
            </Flex>
          )}
        </Box>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Pedir una tabla
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Está seguro de pedir otra tabla?.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                NO
              </Button>
              <Button colorScheme="brand" onClick={requestABoard} ml={3}>
                SI
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Group;
