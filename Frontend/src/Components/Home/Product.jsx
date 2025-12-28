import { productDummyData } from "../../assets/assets";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
const Product = () => {
  const products = productDummyData;
  return (
    <div className="w-8/12 mx-auto flex flex-col p-5 items-center">
      <h2 className="text-xl font-semibold mb-3">Latest Products</h2>
      <div className="flex gap-2.5 mb-8">
        <span className="text-sm text-gray-600">
          Showing 4 of {products.length} products
        </span>
        <Link
          to="/shop"
          className="inline-flex items-center text-xsm text-green-500 gap-2"
        >
          View More
          <ArrowRight size={12} className="font-bold" />
        </Link>
      </div>
      <div className="flex gap-10 flex-wrap mb-20">
        {products.slice(0, 4).map((i, index) => {
          const dummyImage = i.images.slice(0, 1);
          const rating = Math.floor(i.rating.slice(0, 1)[0].rating);
          return (
            <div id={index} className="flex flex-col gap-2 cursor-pointer">
              <div className="size-60 flex items-center justify-center group bg-gray-200 rounded-lg">
                <img
                  src={dummyImage}
                  alt="_productImage"
                  className="size-40 rounded-lg transform transition-all group-hover:scale-110"
                />
              </div>
              <div className="flex gap-4 ">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{i.name}</span>
                  <div className="flex gap-2">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => {
                        return (
                          <Star
                            id={i}
                            key={i}
                            size={12}
                            className={
                              i < rating
                                ? "fill-yellow-500 text-orange-300"
                                : "fill-gray-400 text-gray-400"
                            }
                          />
                        );
                      })}
                  </div>
                </div>
                {/* Price */}
                <div className="text-sm">${i.mrp}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
