import React from "react";
import { useEffect } from "react";

const OrderDetail = ({ orderItem, order, setShowOrderDetail }) => {
  const address = order.address;
  const user = order.user;
  const imageUrl = () => {
    if (orderItem.image[0].startsWith("http")) {
      return orderItem.image[0];
    } else {
      return `${import.meta.env.VITE_SERVER_URL}${orderItem.image[0]}`;
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/10 ">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-sm p-6 rounded-md shadow-sm relative flex flex-col gap-3.5 bg-gray-100"
      >
        <h2 className="text-2xl font-semibold  text-center">Order Details</h2>
        {/* Customer details section */}
        <div className="flex flex-col gap-1.5 mb-3">
          <span className="font-bold text-gray-700">Customer details:</span>

          {/* Customer detail div */}
          <div className="flex flex-col text-xs">
            <div className="flex text-gray-500 gap-2 ">
              <span>Name: </span>
              <span>{address.userName}</span>
            </div>
            <div className="flex text-gray-500 gap-2">
              <span>Email: </span>
              <span>{user.email}</span>
            </div>
            <div className="flex text-gray-500 gap-2">
              <span>Phone: </span>
              <span>{address.phone}</span>
            </div>
            <div className="flex text-gray-500 gap-2">
              <span>Address: </span>
              <span>
                {address.address},{address.street},{address.state},
                {address.country}
              </span>
            </div>
          </div>
          <span className="font-bold text-sm mt-3 text-gray-700">
            Product:{" "}
          </span>
          <div className="w-full p-2 border border-gray-50 shadow-sm rounded-md flex gap-2.5">
            <img src={imageUrl()} alt="_product_image" className="size-12 " />
            <div className="flex flex-col text-xs text-gray-600">
              <span>{orderItem.name}</span>
              <span>Qty: {orderItem.quantity}</span>
              <span>Price: {orderItem.price}</span>
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-7">
            <div className="flex gap-2">
              <span className="text-indigo-900 ">Payment method: </span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-indigo-900 ">Payment Status: </span>
              <span>{order.paymentStatus}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-indigo-900 ">Coupen: </span>
              <span>{orderItem.coupen ? orderItem.coupen : "Not applied"}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-indigo-900 ">Status: </span>
              <span>{orderItem.orderStatus}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-indigo-900 ">Order Date: </span>
              <span>{new Date(orderItem.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mt-8 w-full flex justify-end">
            <button
              onClick={() => {
                setShowOrderDetail((prev) => !prev);
              }}
              className="w-fit py-1 px-3 bg-gray-200 rounded-sm text-indigo-900 text-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
