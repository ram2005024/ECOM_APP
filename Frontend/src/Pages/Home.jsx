import Hero from "../Components/Home/Hero";
import { useEffect } from "react";

import Join from "../Components/Home/Join";
import Product from "../Components/Home/Product";
import ScrollProduct from "../Components/Home/ScrollProduct";
import Selling from "../Components/Home/Selling";
import Specification from "../Components/Home/Specification";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../slices/authSlice";
const Home = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/auth/user/me",
          {
            withCredentials: true,
          }
        );
        dispatch(login(res.data.user));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  return (
    <div>
      <hr className="text-gray-300 " />
      <Hero />
      <ScrollProduct />
      <Product />
      <Selling />
      <Specification />
      <Join />
    </div>
  );
};

export default Home;
