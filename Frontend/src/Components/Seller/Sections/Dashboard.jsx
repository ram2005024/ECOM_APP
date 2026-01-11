import {
  BadgeDollarSign,
  ShoppingBasket,
  Star,
  Tags,
  User2,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSmallDiv from "../../Loading/LoadingSmallDiv";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { seller } = useSelector((state) => state.seller);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/store/getAllDetails",
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) throw new Error(res.data.message);
        setRatings(res.data.ratings);
        setTotalOrders(res.data.totalOrders);
        setTotalEarning(res.data.totalEarning);
        setTotalRating(res.data.totalRating);
        setTotalProducts(res.data.totalProduct);
        setLoading(false);
        setProducts(res.data.sellerProducts);
      } catch (error) {
        console.log(error.message || error);
      }
    })();
  }, []);
  const navigate = useNavigate();
  if (loading) {
    return <LoadingSmallDiv />;
  }
  return (
    <div className="col-span-10">
      <div className="sm:mt-10 sm:ml-15 space-y-3.5">
        <h2 className="text-2xl font-semibold text-gray-500">
          Seller
          <span className="text-black"> Dashboard</span>
        </h2>
        <div className="flex sm:flex-row flex-col sm:gap-12">
          {/* For total products */}
          <div className="px-5 flex sm:gap-10 py-2 border rounded-md border-gray-100 shadow-sm">
            <div className="flex flex-col gap-2 ">
              <span className="text-sm text-gray-500">Total Products</span>
              <span className="text-2xl font-semibold">{totalProducts}</span>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 rounded-full sm:p-6 p-2">
              <ShoppingBasket
                size={30}
                className="text-gray-400 rounded-full "
              />
            </div>
          </div>
          {/* For total Earning */}
          <div className="px-5 flex sm:gap-10 py-2 border rounded-md border-gray-100 shadow-sm">
            <div className="flex flex-col gap-2 ">
              <span className="text-sm text-gray-500">Total Earning</span>
              <span className="text-2xl font-semibold">{totalEarning}</span>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 rounded-full sm:p-6 p-2">
              <BadgeDollarSign
                size={30}
                className="text-gray-400  rounded-full "
              />
            </div>
          </div>
          {/* Total Order */}
          <div className="px-5 flex sm:gap-10 py-2 border rounded-md border-gray-100 shadow-sm">
            <div className="flex flex-col gap-2 ">
              <span className="text-sm text-gray-500">Total Orders</span>
              <span className="text-2xl font-semibold">{totalOrders}</span>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 rounded-full sm:p-6 p-2">
              <Tags size={30} className="text-gray-400 rounded-full " />
            </div>
          </div>
          {/* Total rating */}
          <div className="px-5 flex sm:gap-10 py-2 border rounded-md border-gray-100 shadow-sm">
            <div className="flex flex-col gap-2 ">
              <span className="text-sm text-gray-500">Total rating</span>
              <span className="text-2xl font-semibold">{totalRating}</span>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 rounded-full sm:p-6 p-2">
              <Star size={30} className="text-gray-400 rounded-sm:full10" />
            </div>
          </div>
        </div>
        {/* Review showing section */}
        <div className="sm:mt-10">
          <h2 className="text-xl text-gray-600  ">
            {ratings.length > 0 ? "Total reviews" : "No review yet!"}
          </h2>
          {ratings.length > 0 && (
            <div className="mt-5 w-full">
              {ratings.map((i) => {
                const user = i.user;
                const rating = i.rating;
                const product = products.find((p) => p.id == i.productId);
                return (
                  <div className="border-b border-gray-200 flex flex-col gap-3 mb-10 py-4 w-10/12">
                    <div className="flex justify-between w-10/12">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-1.5 items-center">
                          {user?.image ? (
                            <img
                              src={user.image}
                              alt={`user_${user.id}_image`}
                              className="size-18 rounded-full"
                            />
                          ) : (
                            <div>
                              <User2 className="size-8 text-gray-500 bg-black p-1.5 rounded-full" />
                            </div>
                          )}
                          <div className="text-sm flex flex-col text-gray-500">
                            <span>{user.name}</span>
                            <span>
                              {new Date(i.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className=" text-gray-500 w-xs">{i.comment}</p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:mr-15 mr-3 ">
                          <span className="text-sm text-gray-500">
                            {product.category.name}
                          </span>
                          <span className="text-sm text-gray-600">
                            {product.name}
                          </span>
                          <span className="inline-flex gap-1">
                            {rating &&
                              Array.from({ length: 5 }).map((_, idx) => {
                                return (
                                  <Star
                                    size={15}
                                    className={`${
                                      rating > idx
                                        ? "text-yellow-300 fill-yellow-300"
                                        : "text-gray-300 fill-gray-300"
                                    }`}
                                  />
                                );
                              })}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            if (!seller.isActive) return;
                            navigate(
                              `${import.meta.env.VITE_SERVER_URL}/product/${
                                product.id
                              }`
                            );
                          }}
                          className={`bg-gray-200 rounded-sm px-3 py-1.5 w-fit  text-sm cursor-pointer ${
                            seller.isActive
                              ? "text-indigo-900 "
                              : "text-gray-500 font-semibold"
                          }`}
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
