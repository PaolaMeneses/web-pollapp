import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { useLoginMutation, useRegisterMutation } from "../api/auth";
import { useForm } from "react-hook-form";
import useInitPage from "../hooks/useInitPage";

const Signup = () => {
  const navigate = useNavigate();

  const [registerNewUser] = useRegisterMutation();
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleShowPass = () =>
    setShowPass((currentShowPass) => !currentShowPass);
  const handleShowPassConfirm = () =>
    setShowPassConfirm((currentShowPassConfirm) => !currentShowPassConfirm);

  const login = async (values) => {
    const { email, password, firstname, lastname } = values;
    await registerNewUser({
      email,
      password,
      firstname,
      lastname,
    }).unwrap();
    // navigate("/");
  };

  return (
    <Box
      w="100%"
      minH="100vh"
      bgGradient="linear(to-br, brand.500, brand.600)"
      pb="30px"
    >
      <Box m="0 auto" w="80%" h="310px">
        <Image w="100%" src="/img/images.svg"></Image>
      </Box>
      <form onSubmit={handleSubmit(login)}>
        <Flex px="15px" direction="column">
          <FormControl isInvalid={errors.firstname} mb="10px">
            <FormLabel htmlFor="firstname" color="#fff">
              Nombre *
            </FormLabel>
            <Input
              id="firstname"
              borderRadius="25px"
              type="text"
              bg="#fff"
              {...register("firstname", {
                required: "El nombre es requerido",
                setValueAs: (v) => v.trim(),
              })}
            />
            <FormErrorMessage>
              {errors.firstname && errors.firstname.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.lastname} mb="10px">
            <FormLabel htmlFor="lastname" color="#fff">
              Apellido *
            </FormLabel>
            <Input
              id="lastname"
              borderRadius="25px"
              type="text"
              bg="#fff"
              {...register("lastname", {
                required: "El apellido es requerido",
                setValueAs: (v) => v.trim(),
              })}
            />
            <FormErrorMessage>
              {errors.lastname && errors.lastname.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} mb="10px">
            <FormLabel htmlFor="email" color="#fff">
              Correo electrónico *
            </FormLabel>
            <Input
              id="email"
              borderRadius="25px"
              type="email"
              bg="#fff"
              {...register("email", {
                required: "Falta correo electrónico",
                setValueAs: (v) => v.trim(),
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} mb="10px">
            <FormLabel htmlFor="password" color="#fff">
              Contraseña *
            </FormLabel>
            <InputGroup>
              <Input
                id="password"
                borderRadius="25px"
                pr="4.5rem"
                type={showPass ? "text" : "password"}
                bg="#fff"
                {...register("password", {
                  required: "Falta la constraseña",
                  setValueAs: (v) => v.trim(),
                })}
              />
              <InputRightElement width="4.5rem">
                <Icon
                  onClick={handleShowPass}
                  color="gray"
                  fontSize="30px"
                  as={showPass ? HiEyeOff : HiEye}
                ></Icon>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password_confirm}>
            <FormLabel htmlFor="password_confirm" color="#fff">
              Confirmar contraseña *
            </FormLabel>
            <InputGroup>
              <Input
                id="password_confirm"
                borderRadius="25px"
                pr="4.5rem"
                type={showPassConfirm ? "text" : "password"}
                bg="#fff"
                {...register("password_confirm", {
                  required: "Falta confirmar la constraseña",
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "La confirmación de contraseña no coincide";
                    }
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Icon
                  onClick={handleShowPassConfirm}
                  color="gray"
                  fontSize="30px"
                  as={showPassConfirm ? HiEyeOff : HiEye}
                ></Icon>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password_confirm && errors.password_confirm.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex justifyContent="center" mt="30px">
          <Button
            w="50%"
            h="50px"
            color="#fff"
            colorScheme="brand"
            bg="rgba(255,255,255, 0.2)"
            isLoading={isSubmitting}
            loadingText="Iniciando sesión..."
            type="submit"
          >
            Registrarse
          </Button>
        </Flex>
        <Flex justify="center" alignItems="center" fontSize={20} mt="10px">
          <Link as={NavLink} color="white" to={`/login`}>
            <Text>¿Ya tienes cuenta?</Text>
          </Link>
        </Flex>
      </form>
    </Box>
  );
};

export default Signup;
