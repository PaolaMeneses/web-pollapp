import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useLoginMutation } from "../api/auth";
import useInitPage from "../hooks/useInitPage";

const Login = () => {
  const navigate = useNavigate();

  const [userLogin, { isLoading, error, data }] = useLoginMutation();
  const [show, setShow] = useState(false);

  useInitPage({ logoutRequered: true });

  const handleClick = () => setShow(!show);
  const login = async () => {
    await userLogin({
      email: "andares@qemal.co",
      password: "123456",
    }).unwrap();
    navigate("/");
  };

  return (
    <Box w="100%" minH="100vh" bgGradient="linear(to-br, brand.500, brand.600)">
      <Box m="0 auto" w="80%" h="310px">
        <Image w="100%" src="/img/images.svg"></Image>
      </Box>

      <Flex px="15px" direction="column">
        <FormControl mb="10px">
          <FormLabel color="#fff">Correo electrónico</FormLabel>
          <Input borderRadius="25px" type="email" bg="#fff"></Input>
        </FormControl>
        <FormControl>
          <FormLabel color="#fff">Contraseña</FormLabel>
          <InputGroup>
            <Input
              borderRadius="25px"
              pr="4.5rem"
              type={show ? "text" : "password"}
              bg="#fff"
            ></Input>
            <InputRightElement width="4.5rem">
              <Icon
                onClick={handleClick}
                color="gray"
                fontSize="30px"
                as={show ? HiEyeOff : HiEye}
              ></Icon>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>
      <Flex justifyContent="center" mt="70px">
        <Button
          w="50%"
          h="50px"
          color="#fff"
          colorScheme="brand"
          bg="rgba(255,255,255, 0.2)"
          isLoading={isLoading}
          loadingText="Iniciando sesión..."
          onClick={() => login()}
        >
          Iniciar sesión
        </Button>
      </Flex>
    </Box>
  );
};

export default Login;
