import { ArrowRight, Star } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { findAverageRatingFromReviews } from "../../utils/findAverageRating";
const Selling = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const handleClick = async (product) => {
    const pid = product.id;
    navigate(`product/${pid}`);
  };

  return products?.length > 0 ? (
    <div className="sm:w-8/12 w-11/12 mx-auto flex flex-col p-5 items-center">
      <h2 className="text-xl font-semibold mb-3">Latest Products</h2>
      <div className="flex gap-2.5 mb-8">
        <span className="text-sm text-gray-600">
          Showing {Math.min(8, products.length)} of {products.length} products
        </span>
        <Link
          to="/shop"
          className="inline-flex items-center text-xsm text-green-500 gap-2"
        >
          View More
          <ArrowRight size={12} className="font-bold" />
        </Link>
      </div>
      <div className="w-full">
        <div className="flex flex-wrap sm:gap-10 gap-5">
          {[...products]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 8)
            .map((i) => {
              const rating = findAverageRatingFromReviews(i.reviews);
              const imageURL = () => {
                if (i.image[0].startsWith("http")) {
                  return i.image[0];
                } else {
                  return `${import.meta.env.VITE_SERVER_URL}${i.image[0]}`;
                }
              };

              return (
                <div
                  className="group cursor-pointer"
                  onClick={() => handleClick(i)}
                >
                  <div className="sm:size-50 size-40 border border-gray-100 flex items-center justify-center group bg-white rounded-lg">
                    <img
                      src={imageURL()}
                      alt="_productImage"
                      className="sm:size-30 size-20 bg-white rounded-lg transform transition-all group-hover:scale-110"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                      <span className="text-sm">{i.name}</span>
                      {rating ? (
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
                                      ? "fill-yellow-500 text-yellow-500"
                                      : "fill-gray-400 text-gray-400"
                                  }
                                />
                              );
                            })}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Not rated</span>
                      )}
                    </div>
                    <div className="flex gap-1.5">
                      <div className=" text-sm">${i.price}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-8/12 mx-auto flex flex-col p-5 items-center">
      <span>No products added yet</span>
    </div>
  );
};

export default Selling;
