import React from "react";
import Nav from "../src/Components/Nav/ProtectedNav";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
