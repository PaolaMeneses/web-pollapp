import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PageLogOutRequired = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return !token ? children : <Navigate to="/" replace />;
};

export default PageLogOutRequired;
