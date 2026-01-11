import React from "react";
import Nav from "../src/Components/Home/Nav";
import { Outlet } from "react-router-dom";
import { Footer } from "../src/Components/Home/Footer";
import { useState } from "react";
import { setProduct } from "../src/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import TrialReminder from "../src/Components/Banners/TrialReminder";
import { setShowProfile } from "../src/slices/profileSlice";
const MainLayout = () => {
  const dispath = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const subscription = useSelector((state) => state.auth.subscription);
  //Banner ids----
  const bannerId = "subscription_banner";
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
    if (localStorage.getItem(`banner_show_${bannerId}`)) {
      setIsVisible(false);
    }
    getProduct();
  }, []);

  return (
    <div
      id="#"
      className="min-h-screen min-w-screen flex flex-col "
      onClick={() => {
        dispath(setShowProfile(false));
      }}
    >
      {subscription && isVisible && (
        <TrialReminder
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          bannerId={bannerId}
        />
      )}
      <Nav />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
