import React from "react";
import { useSelector } from "react-redux";
import Login from "../Components/SignIn/Login";

const Protected = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return isAuthenticated && user.role === "seller" ? children : <Login />;
};

export default Protected;
