import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../Components/Home/Nav";
import { Footer } from "../Components/Home/Footer";

const ProductView = () => {
  const { pid } = useParams();

  return (
    <div className="min-h-screen min-w-screen">
      <Nav />
      <Footer />
    </div>
  );
};

export default ProductView;
