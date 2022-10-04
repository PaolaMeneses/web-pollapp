import React, { useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import useInitPage from "../hooks/useInitPage";

const RouteAuth = ({ children, pageOpts = {} }) => {
  const [loadingPage, setloadingPage] = useState(true);
  const { headerText = false } = pageOpts;
  useInitPage({ headerText });
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

  return <>{children}</>;
};

export default RouteAuth;
