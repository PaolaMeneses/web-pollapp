import React from "react";
import { Container } from "@chakra-ui/react";

import Header from "./Header";
import Nav from "./Nav";

const Layout = ({ children, headerText }) => {
  return (
    <>
      <Nav />
      <Header headerText={headerText} />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
