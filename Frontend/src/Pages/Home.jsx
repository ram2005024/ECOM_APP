import Hero from "../Components/Home/Hero";
import Join from "../Components/Home/Join";
import Product from "../Components/Home/Product";
import ScrollProduct from "../Components/Home/ScrollProduct";
import Selling from "../Components/Home/Selling";
import Specification from "../Components/Home/Specification";

const Home = () => {
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
