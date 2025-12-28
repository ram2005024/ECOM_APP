import React from "react";
import { useSelector } from "react-redux";
import Login from "../Components/SignIn/Login";

const Protected = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Login />;
};

export default Protected;
