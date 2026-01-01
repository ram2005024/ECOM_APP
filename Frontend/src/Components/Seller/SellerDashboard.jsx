import React from "react";
import SellerSideBar from "./SellerSideBar";
import { useSelector } from "react-redux";
import Dashboard from "./Sections/Dashboard";
import AddProduct from "./Sections/AddProduct";
import ManageProduct from "./Sections/ManageProduct";
import Orders from "./Sections/Orders";

const SellerDashboard = () => {
  const { section } = useSelector((state) => state.seller);
  return (
    <div className="flex-1 grid grid-cols-12 ">
      <SellerSideBar />
      {section === "dashboard" && <Dashboard />}
      {section === "addProduct" && <AddProduct />}
      {section === "manageProduct" && <ManageProduct />}
      {section === "order" && <Orders />}
    </div>
  );
};

export default SellerDashboard;
