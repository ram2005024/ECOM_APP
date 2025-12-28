import { Footer } from "../Components/Home/Footer";
import Hero from "../Components/Home/Hero";
import Join from "../Components/Home/Join";
import Nav from "../Components/Home/Nav";
import Product from "../Components/Home/Product";
import ScrollProduct from "../Components/Home/ScrollProduct";
import Selling from "../Components/Home/Selling";
import Specification from "../Components/Home/Specification";

const Home = () => {
  return (
    <div id="#" className="min-h-screen min-w-screen ">
      <Nav />
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
