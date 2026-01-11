import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DotIcon,
  MoveRight,
  NotebookPen,
  PlusSquare,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import RatingForm from "../Components/Orders/RatingForm";
import { deleteCart } from "../slices/cartSlice";
const Orders = () => {
  const [orders, setOrders] = useState();
  const [currentPId, setCurrentPId] = useState(null);
  const [ratingClicked, setRatingClicked] = useState(false);
  const [currentProductRating, setCurrentProductRating] = useState();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/order/get",
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        setOrders(res.data.orders);

        dispatch(deleteCart());
      } catch (error) {
        console.log(error.message || error);
      }
    };
    const getProduct = async () => {
      if (products.length > 0) {
        const found = products.find((i) => i.id == pid);
        setProduct(found);
        setSelected(found.image[0]);
      }
    };
    getProduct();
    fetchCart();
  }, [ratingClicked]);
  if (orders?.length === 0) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        <div className="flex flex-col gap-1.5 items-center">
          <PlusSquare size={18} className=" text-gray-600" />
          <h2>No orders yet</h2>
          <span>Please shop and start your journey</span>
        </div>
      </div>
    );
  }
  const getOrderStatus = (items) => {
    const statuses = items.map((i) => i.orderStatus);
    if (statuses.every((i) => i === "DELIVERED")) return "Delivered";
    if (statuses.some((i) => i === "SHIPPING")) return "Shipping";
    if (statuses.some((i) => i === "PROCESSING")) return "Processing";
    if (statuses.some((i) => i === "DELIVERED")) return "Partially Delivered";
    else return "Order placed";
  };

  return (
    <div className="min-w-screen min-h-screen">
      <div className="w-10/12 m-auto mt-16">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-semibold">My orders</h2>
          <span className="inline-flex gap-3 text-gray-700">
            Showing total {orders && orders.length} orders
            <Link
              to="/"
              className=" inline-flex items-center gap-2 text-gray-500 text-sm"
            >
              Go to home
              <MoveRight size={12} className="text-gray-600" />
            </Link>
          </span>
        </div>
        {/* When the user wants to rate the product */}
        {ratingClicked && (
          <RatingForm
            ratingClicked={ratingClicked}
            setIsRatingClicked={setRatingClicked}
            productId={currentPId}
            setCurrentPId={setCurrentPId}
            existingRating={currentProductRating}
            setCurrentProductRating={setCurrentProductRating}
          />
        )}
        {/* Displaying the orders table */}
        <div className="mt-15 overflow-x-scroll pb-6 rounded-md border border-gray-200">
          <table className="border-collapse min-w-full">
            <thead className="border-b border-b-gray-100 bg-gray-50">
              <tr>
                <th className="py-4">Product </th>
                <th className="py-4">Total Price</th>
                <th className="py-4 hidden md:table-cell">Address</th>
                <th className="py-4">Status</th>
              </tr>
            </thead>
            <tbody className="pt-10">
              {orders &&
                orders.map((item, index) => {
                  const imageURL = (image) => {
                    if (image[0].startsWith("http")) {
                      return image[0];
                    } else {
                      return `${import.meta.env.VITE_SERVER_URL}${image[0]}`;
                    }
                  };
                  const orderStatus = getOrderStatus(item.items);
                  return (
                    <tr key={index} className="py-2">
                      <td className="px-6 text-center align-middle">
                        <div className="flex flex-col sm:gap-6 gap-3 text-xs mt-10">
                          {item &&
                            item.items.map((i, idx) => {
                              const review = i.product.reviews.find(
                                (i) => i.userId == user.id
                              );
                              return (
                                <div
                                  key={idx}
                                  className="flex justify-center items-center gap-6 text-xs"
                                >
                                  <img
                                    src={imageURL(i.image)}
                                    alt="product_image"
                                    className="sm:size-13 size-8 rounded-xs"
                                  />
                                  <div className="flex flex-col items-start">
                                    <h2>{i.name}</h2>
                                    <div className="flex sm:flex-row flex-col sm:gap-2 sm:text-sm text-xs">
                                      <span className=" text-gray-600">
                                        ${i.price}
                                      </span>
                                      <span className=" text-gray-600">
                                        Qty: {i.quantity}
                                      </span>
                                    </div>
                                    <span>
                                      {new Date(
                                        i.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                    {review ? (
                                      <div className="flex gap-2 items-center">
                                        <div className="flex gap-1.5">
                                          {Array.from({ length: 5 }).map(
                                            (_, idx) => (
                                              <Star
                                                size={12}
                                                className={`text-gray-400 ${
                                                  Math.round(review.rating) >
                                                  idx
                                                    ? "fill-yellow-300 text-yellow-300"
                                                    : "fill-gray-400"
                                                }`}
                                              />
                                            )
                                          )}
                                        </div>
                                        <NotebookPen
                                          onClick={() => {
                                            setCurrentPId(i.productId);
                                            setRatingClicked(true);
                                            setCurrentProductRating(review);
                                          }}
                                          size={16}
                                          className="text-gray-600 cursor-pointer"
                                        />
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setCurrentPId(i.productId);
                                          setRatingClicked(true);
                                        }}
                                        className="mt-1.5 text-start sm:self-start text-blue-700 cursor-pointer"
                                      >
                                        Rate Product
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </td>
                      <td className="px-6 text-center align-middle">
                        $ {item.totalAmount}
                      </td>
                      <td className="px-6 text-center align-middle hidden md:table-cell">
                        <div className="text-gray-500 flex flex-col gap-2 text-sm">
                          <span>
                            {item.address.userName}, {item.address.street}
                          </span>
                          <span>
                            {item.address.city}, {item.address.state},
                            {item.address.zip},{item.address.country}
                          </span>
                          <span>{item.address.phone}</span>
                        </div>
                      </td>
                      <td>
                        <div className="sm:px-4 py-1 w-fit mx-auto bg-amber-100 rounded-full text-xs sm:text-sm flex sm:gap-2 items-center justify-center">
                          <DotIcon
                            size={20}
                            className={`text-red-600 ${
                              orderStatus === "delivered" && "text-green-600"
                            }`}
                          />
                          <span
                            className={`text-red-600 ${
                              orderStatus === "delivered" && "text-green-600"
                            }`}
                          >
                            {orderStatus}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
