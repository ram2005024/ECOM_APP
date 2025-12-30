import React from "react";
import Nav from "../Components/Admin/Nav";
import SideBar from "../Components/Admin/SideBar";
import { useSelector } from "react-redux";
import Dashboard from "../Components/Admin/Dashboard";
import Store from "../Components/Admin/Store";
import Approve from "../Components/Admin/Approve";
import Coupon from "../Components/Admin/Coupon";

const Admin = () => {
  const section = useSelector((state) => state.admin.section);
  return (
    <div className="h-screen w-screen overflow-y-scroll  grid grid-cols-12 grid-rows-10">
      <Nav />
      <SideBar />
      <div className="col-span-9 row-span-11 overflow-y-scroll">
        {section === "dashboard" && <Dashboard />}
        {section === "store" && <Store />}
        {section === "approve" && <Approve />}
        {section === "coupon" && <Coupon />}
      </div>
    </div>
  );
};

export default Admin;
