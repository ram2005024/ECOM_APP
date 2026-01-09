import React from "react";
import SellerSideBar from "./SellerSideBar";
import { useSelector } from "react-redux";
import Dashboard from "./Sections/Dashboard";
import AddProduct from "./Sections/AddProduct";
import ManageProduct from "./Sections/ManageProduct";
import Orders from "./Sections/Orders";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { section, seller } = useSelector((state) => state.seller);
  return (
    <div className="flex-1 grid grid-cols-12  text-sm ">
      {seller.isActive == false && (
        <div className="fixed bottom-0 z-50  w-screen p-2 flex gap-3 bg-red-400 justify-center items-center">
          <p className=" text-white">
            OOPS! You have been deactivated by admin
          </p>
          <button
            onClick={() =>
              navigate(import.meta.env.VITE_SERVER_URL + "/contact/admin")
            }
            className="px-5 py-2 text-white rounded-md bg-blue-400 cursor-pointer hover:bg-blue-500"
          >
            Contact Admin
          </button>
        </div>
      )}
      <SellerSideBar />
      {section === "dashboard" && <Dashboard />}
      {section === "addProduct" && <AddProduct />}
      {section === "manageProduct" && <ManageProduct />}
      {section === "order" && <Orders />}
    </div>
  );
};

export default SellerDashboard;
