import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { HiDotsCircleHorizontal } from "react-icons/hi";

import {
  groupsApi,
  useAllGroupListQuery,
  useCreateGroupMutation,
} from "../api/groups";
import { useActivateBoardMutation } from "../api/board";

const Groups = () => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [group, setGroup] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: showPending,
    onOpen: onShowPending,
    onClose: onClosePending,
  } = useDisclosure();

  const { data: groups } = useAllGroupListQuery();
  const [createGroup] = useCreateGroupMutation();
  const [onActivateBoard, { isLoading }] = useActivateBoardMutation();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      const group = await createGroup({ name: groupName }).unwrap();
      dispatch(
        groupsApi.util.updateQueryData("allGroupList", undefined, (groups) => [
          ...groups,
          group,
        ])
      );
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setGroupName("");
  };

  const handleShowPending = (group) => {
    setGroup(group);
    onShowPending();
  };

  const handleClosePending = () => {
    onClosePending();
    setGroup({});
  };

  const handleActivateBoard = async (boardId) => {
    await onActivateBoard(boardId).unwrap();
    dispatch(
      groupsApi.util.updateQueryData("allGroupList", undefined, (groups) => {
        const groupFound = groups.find((gp) => gp._id === group._id);
        if (groupFound) {
          groupFound.pending = groupFound.pending.filter(
            (board) => board._id !== boardId
          );
        }
      })
    );
    setGroup((group) => ({
      ...group,
      pending: group.pending.filter((board) => board._id !== boardId),
    }));
  };

  return (
    <>
      <Flex justifyContent="flex-end" mb="15px">
        <Button onClick={onOpen} colorScheme="brand">
          Crear grupo
        </Button>
      </Flex>
      {groups?.length > 0 ? (
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Código</Th>
                <Th>Nombre</Th>
                <Th>Pend</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {groups.map((group) => (
                <Tr key={group._id}>
                  <Td>{group.code}</Td>
                  <Td>{group.name}</Td>
                  <Td>{group?.pending?.length}</Td>
                  <Td>
                    <IconButton
                      onClick={() => handleShowPending(group)}
                      fontSize="40px"
                      color="brand.500"
                      aria-label="options"
                      icon={<HiDotsCircleHorizontal />}
                    ></IconButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text>No hay grupos creados</Text>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handlerSubmit}>
            <ModalHeader>Crear un grupo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Nombre del grupo"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handlerSubmit} colorScheme="brand" ml={3}>
                guardar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal isOpen={showPending} onClose={handleClosePending}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pendientes en {group.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {group?.pending?.length > 0 ? (
              <TableContainer>
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Nombre</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {group?.pending.map(({ _id, user }) => (
                      <Tr key={user._id}>
                        <Td>{`${user.firstname} ${user.lastname}`}</Td>
                        <Td isNumeric>
                          <IconButton
                            onClick={() => handleActivateBoard(_id)}
                            aria-label="activate"
                            icon={<CheckIcon />}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Text>No hay tablas pendientes</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          h="100vh"
          w="100%"
          pt="100px"
          zIndex={2000}
          backgroundColor="rgba(0,0,0,.4)"
        >
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              size="xl"
            />
          </Center>
        </Box>
      )}
    </>
  );
};

export default Groups;
