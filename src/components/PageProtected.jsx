import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import { useCurrentUserMutation } from "../api/auth";
import useInitPage from "../hooks/useInitPage";
import { logout } from "../store/auth";

const PageProtected = ({ children, pageOpts = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [currentUser] = useCurrentUserMutation();

  const [loadingPage, setloadingPage] = useState(true);
  useInitPage(pageOpts);
  const verifyCurrentUser = async () => {
    try {
      if (token) {
        await currentUser().unwrap();
      }
      setloadingPage(false);
    } catch (error) {
      dispatch(logout());
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyCurrentUser();
  }, []);

  if (loadingPage) {
    return (
      <Center h="100vh">
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

  return token ? children : <Navigate to="/login" replace />;
};

export default PageProtected;
