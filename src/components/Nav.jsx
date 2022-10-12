import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Flex,
  Grid,
  Slide,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronUpIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { GiSoccerBall, GiStairsGoal } from "react-icons/gi";
import { setAppConfig } from "../store/app";
import { logout } from "../store/auth";
import { HiOutlineViewGrid } from "react-icons/hi";

const routes = [
  {
    id: 1,
    path: "/",
    name: "Inicio",
    icon: GiStairsGoal,
  },
  {
    id: 2,
    path: "/matches",
    name: "Partidos",
    icon: GiSoccerBall,
  },
  {
    id: 3,
    path: "/positions",
    name: "Posiciones",
    icon: GiStairsGoal,
  },
];

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMenu } = useSelector((state) => state.app);

  const userLogout = () => {
    dispatch(logout());
    // navigate("/login");
  };

  return (
    <Box
      bg="#fff"
      w="100%"
      position="fixed"
      bottom={0}
      left={0}
      zIndex={100}
      style={{ boxShadow: "0 -1px 8px rgba(0, 0, 0, 0.15)" }}
    >
      <Container>
        <Flex justifyContent="space-between" alignItems="center" h="3rem">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronUpIcon />} bg="white">
              <Text fontSize={20} as="b">
                Andrés Posada
              </Text>
            </MenuButton>
            <MenuList>
              <MenuGroup title="Perfil">
                <MenuItem>Mi cuenta</MenuItem>
                <MenuItem>Soporte de pagos</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={userLogout}>
                <Text color="red.600">Cerrar sesión</Text>
              </MenuItem>
              {/* <MenuGroup title="Help">
                <MenuItem>FAQ</MenuItem>
              </MenuGroup> */}
            </MenuList>
          </Menu>
          {/* <Slide direction="bottom" in={toggleMenu}> */}
          <Box w="100%" position="fixed" left={0}>
            <Slide direction="bottom" in={showMenu} style={{ zIndex: 10 }}>
              <Box
                bg="#fff"
                w="100%"
                pt="2rem"
                px="1.5rem"
                pb="1rem"
                style={{ boxShadow: "0 -1px 8px rgba(0, 0, 0, 0.15)" }}
                // style={{ border: ".5px solid red" }}
              >
                <Grid
                  // style={{ border: ".5px solid red" }}
                  templateColumns="repeat(3, 1fr)"
                  gap="2rem"
                >
                  {routes.map((route) => (
                    <Box key={route.id}>
                      <NavLink
                        end
                        // onClick={() => goToPath(route.path)}
                        to={`${route.path}`}
                        style={(props) => {
                          const { isActive } = props;
                          return isActive
                            ? {
                                fontWeight: "bold",
                                color: "#850f32",
                              }
                            : undefined;
                        }}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Icon as={route.icon} fontSize="1.2rem" />
                          {route.name}
                        </Box>
                      </NavLink>
                    </Box>
                  ))}
                </Grid>
                <Flex
                  // style={{ border: ".5px solid red" }}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  mt="2rem"
                >
                  <SmallCloseIcon
                    fontSize="2xl"
                    // style={{ border: ".5px solid red" }}
                    onClick={() => dispatch(setAppConfig({ showMenu: false }))}
                    // position="absolute"
                    // right="1.3rem"
                    // bottom="1rem"
                  />
                </Flex>
              </Box>
            </Slide>
          </Box>
          {/* </Slide> */}
          <Flex alignItems="center">
            <Icon
              as={HiOutlineViewGrid}
              fontSize={"3xl"}
              onClick={() => dispatch(setAppConfig({ showMenu: true }))}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
