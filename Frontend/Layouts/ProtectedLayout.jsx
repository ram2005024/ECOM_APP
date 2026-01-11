import React from "react";
import Nav from "../src/Components/Nav/ProtectedNav";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowProfileProtected } from "../src/slices/profileSlice";

const ProtectedLayout = () => {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(setShowProfileProtected(false))}>
      <Nav />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
