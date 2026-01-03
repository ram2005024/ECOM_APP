import React from "react";
import Nav from "../src/Components/Home/Nav";
import { Outlet } from "react-router-dom";
import { Footer } from "../src/Components/Home/Footer";
import { useState } from "react";
import { setProduct } from "../src/slices/productSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
const MainLayout = () => {
  const [showProfile, setShowProfile] = useState(false);
  const dispath = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/product/getAllProduct",
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          return;
        }
        dispath(setProduct(res.data.products));
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);
  return (
    <div
      id="#"
      className="min-h-screen min-w-screen "
      onClick={() => setShowProfile(false)}
    >
      <Nav showProfile={showProfile} setShowProfile={setShowProfile} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
