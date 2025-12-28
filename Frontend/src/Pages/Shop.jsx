import React, { useState } from "react";
import Nav from "../Components/Home/Nav";
import { Footer } from "../Components/Home/Footer";
import { productDummyData } from "../assets/assets";
import { DollarSign, Star } from "lucide-react";
const Shop = () => {
  const [products, setProducts] = useState(productDummyData);

  return (
    <div className="min-h-screen m-w-screen ">
      <Nav />
      <hr className="text-gray-300 " />

      <div className="w-10/12 mx-auto mt-10 mb-15 ">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">
            <span className="text-2xl text-green-700">All</span> Products
          </h2>
          <div className="flex flex-wrap gap-10 ">
            {products.map((i) => {
              const rating = Math.floor(i.rating.slice(0, 1)[0].rating);

              return (
                <div className="group cursor-pointer">
                  <div className=" flex justify-center size-60  bg-pink-100 rounded-lg items-center">
                    <img
                      src={i.images[0]}
                      alt={i.id}
                      className="max-w-10/12 max-h-8/12 transform transition-all group-hover:scale-110"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                      <span className="text-sm">{i.name}</span>
                      <span className="flex gap-1.5">
                        {Array(5)
                          .fill(null)
                          .map((_, index) => {
                            return (
                              <Star
                                key={index}
                                size={12}
                                className={
                                  index < rating
                                    ? "fill-emerald-500 text-emerald-600"
                                    : "fill-gray-400 text-gray-400"
                                }
                              />
                            );
                          })}
                      </span>
                    </div>
                    <span className="inline-flex items-center text-sm gap-1.5">
                      <DollarSign size={12} />
                      {i.mrp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
