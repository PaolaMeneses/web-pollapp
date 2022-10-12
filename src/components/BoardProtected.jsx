import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import { useValidateBoardQuery } from "../api/board";
import BoardHeader from "./BoardHeader";

const BoardProtected = () => {
  const { boardId } = useParams();
  const {
    data: { _id } = {},
    isError,
    isLoading,
    isFetching,
  } = useValidateBoardQuery(boardId);

  if (isLoading || isFetching) {
    return (
      <Center>
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

  if (!_id || isError) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <BoardHeader />
      <Outlet />
    </>
  );
};

export default BoardProtected;
