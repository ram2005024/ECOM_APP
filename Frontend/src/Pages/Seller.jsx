// import React, { useState } from "react";
// import { storesDummyData } from "../assets/assets";
import Nav from "../Components/Seller/Nav";
import { useDispatch, useSelector } from "react-redux";
import SellerForm from "../Components/Seller/SellerForm";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { createSeller } from "../slices/sellerSlice";

const Seller = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const seller = useSelector((state) => state.seller.seller);
  console.log("Yo hai ", seller);
  useEffect(() => {
    const getSellerDetail = async () => {
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/store/get",
          { userID: user?.id },
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          toast.error(res.data.message);
          return;
        }

        dispatch(createSeller(res.data.seller));
      } catch (error) {
        console.log(error);
      }
    };
    getSellerDetail();
  }, []);
  return (
    <div className="h-screen w-screen grid grid-cols-12 grid-rows-12">
      <Nav />
      {!seller?.filled && <SellerForm />}
      {seller?.filled && seller.isApproved === "pending" && (
        <div>Show documnent with pending status</div>
      )}
    </div>
  );
};

export default Seller;
