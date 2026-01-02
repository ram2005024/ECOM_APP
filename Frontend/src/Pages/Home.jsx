import { useState } from "react";
import { Footer } from "../Components/Home/Footer";
import Hero from "../Components/Home/Hero";
import Join from "../Components/Home/Join";
import Nav from "../Components/Home/Nav";
import Product from "../Components/Home/Product";
import ScrollProduct from "../Components/Home/ScrollProduct";
import Selling from "../Components/Home/Selling";
import Specification from "../Components/Home/Specification";
import { setProduct } from "../slices/productSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
const Home = () => {
  const dispath = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
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
      <hr className="text-gray-300 " />
      <Hero />
      <ScrollProduct />
      <Product />
      <Selling />
      <Specification />
      <Join />
      <Footer />
    </div>
  );
};

export default Home;
