import axios from "axios";
import { Loader, PlusSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const getSellerOrder = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/store/getOrders",
        {
          withCredentials: true,
        }
      );
      if (!res.data.success) {
        setOrderItems([]);
        setOrder([]);
      }

      setOrderItems(res.data.orderItems);
      setOrder(res.data.order[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    getSellerOrder();
  }, []);
  const handleStatusChange = async (itemId, value) => {
    setLoading(true);
    try {
      await toast.promise(
        axios.post(
          import.meta.env.VITE_SERVER_URL + "/order/changeStatus",
          { itemId, orderStatus: value, userId: order.userId },
          {
            withCredentials: true,
          }
        ),
        {
          loading: "Setting status....",
          success: (res) => {
            if (res.data.success) {
              return res.data.message;
            } else {
              throw new Error(res.data.message);
            }
          },
          error: (error) =>
            error.message ||
            error.response?.data?.message ||
            "Something went wrong",
        }
      );
      getSellerOrder();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const orderStatuses = [
    "ORDER_PLACED",
    "DELIVERED",
    "SHIPPING",
    "PROCESSING",
    "CANCELLED",
  ];
  if (loading) {
    return (
      <div className="col-span-10 justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-blue-600" size={48} />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  if (order && order.length === 0) {
    return (
      <div className="col-span-10 justify-center items-center">
        <div className="flex flex-col gap-1.5 items-center">
          <PlusSquare size={25} className="text-gray-500 " />
          <h2>No orders received yet</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-10">
      <div className="mt-10 ml-12 flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-gray-500">
          Store <span className="text-black">Orders</span>
        </h2>
        <div className="border border-gray-100 rounded-md w-fit">
          <table className="border-collapse">
            <thead>
              <tr className="border-b border-b-gray-200 bg-gray-50 text-gray-700 text-sm">
                <th className="py-4 px-6">SN.</th>
                <th className="py-4 px-6">CUSTOMER</th>
                <th className="py-4 px-6">TOTAL</th>
                <th className="py-4 px-6">PAYMENT</th>
                <th className="py-4 px-6">COUPEN</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6">DATE</th>
              </tr>
            </thead>
            <tbody>
              {orderItems &&
                orderItems.map((item, index) => {
                  const subTotal = item.price * item.quantity;
                  const discountRatio =
                    order.discountAmount / order.totalAmount;
                  const finalAmount = subTotal - discountRatio * subTotal;
                  const coupen =
                    item.coupen !== "" ? item.coupen : "Not applied";
                  return (
                    <tr
                      key={item.id}
                      className="text-xs text-gray-800 align-center"
                    >
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{order.address.userName}</td>
                      <td className="py-4 px-6">{Math.round(finalAmount)}</td>
                      <td className="py-4 px-6">{order.paymentMethod}</td>
                      <td className="py-4 px-6">{coupen}</td>
                      <td className="py-4 px-6">
                        <select
                          value={item.orderStatus}
                          disabled={loading}
                          className="outline-none border border-gray-200"
                          onChange={(e) => {
                            handleStatusChange(item.id, e.target.value);
                          }}
                        >
                          {orderStatuses.map((i) => (
                            <option value={i}>{i}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        {new Date(item.createdAt).toLocaleDateString()}
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
