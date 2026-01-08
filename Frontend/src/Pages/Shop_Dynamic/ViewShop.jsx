import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../Components/Loading";
import { imageURL } from "../../utils/imageURLCheck.js";
import { findAverageRatingFromReviews } from "../../utils/findAverageRating.js";
import { Star } from "lucide-react";

const ViewShop = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [sellerDetail, setSellerDetail] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/product/get",
          {
            params: {
              sellerId: shopId,
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setLoading(false);
          setProducts(res.data.products);
        }
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    })();
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/store/getSeller",
          {
            params: { sellerId: shopId },
            withCredentials: true,
          }
        );
        if (!res.data.success) throw new Error(res.data.message);
        setLoading(false);
        setSellerDetail(res.data.seller);
      } catch (error) {
        console.log(error.response?.data?.message | error.message);
      }
    })();
  }, []);
  const handleClick = async (product) => {
    const pid = product.id;
    navigate(`/product/${pid}`);
  };
  console.log(products);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-10/12 mx-auto">
      {sellerDetail && (
        <div className="w-full sm:mt-5 mt-2 rounded-lg shadow-md sm:p-6 p-2 bg-gray-100">
          <div className=" flex sm:flex-row flex-col gap-2.5 items-center">
            <div className="size-40 rounded-md flex items-center justify-center">
              <img
                src={imageURL(sellerDetail.image)}
                alt="_sellerImage"
                className="size-30 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">
                {sellerDetail.storename}
              </h2>
              <p className="text-gray-500 text-sm">
                {sellerDetail.description}
              </p>
              <div className="text-gray-500 text-sm">
                <span>{sellerDetail.address}</span>
              </div>
              <div className="text-gray-500 text-sm flex gap-2">
                <span>{sellerDetail.user.email}</span>
                <span>{sellerDetail.phoneNo}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {products && (
        <div className="w-full sm:mt-5 mt-2 rounded-lg  sm:p-6 p-2 ">
          <h2 className="text-2xl font-semibold mb-4">Shop Products</h2>
          {/* Products div */}
          <div className="w-full">
            <div className="flex flex-wrap gap-10 ">
              {products.map((i) => {
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
                    <div className="size-50 border border-gray-100 flex items-center justify-center group bg-white rounded-lg">
                      <img
                        src={imageURL()}
                        alt="_productImage"
                        className="size-30 bg-white rounded-lg transform transition-all group-hover:scale-110"
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
                          <span className="text-sm text-gray-500">
                            Not rated
                          </span>
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
      )}
    </div>
  );
};

export default ViewShop;
