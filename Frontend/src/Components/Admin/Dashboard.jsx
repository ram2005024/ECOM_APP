import React from "react";
import AreaChart from "../../Charts/AreaChart";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import LoadingSmallDiv from "../Loading/LoadingSmallDiv";
import {
  BadgeDollarSignIcon,
  ShoppingBag,
  Star,
  Store,
  Tags,
} from "lucide-react";
const Dashboard = () => {
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [revenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/order/getAllOrdersAndDate"
        );
        if (res.data.success) {
          setLoading(false);
          setValues(res.data.value);
          setTotalProducts(res.data.totalProducts);
          setTotalRevenue(res.data.totalRevenue);
          setTotalOrders(res.data.totalOrders);
          setTotalStores(res.data.totalStores);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/admin/getDetails",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setLoading(false);
          setTotalProducts(res.data.totalProducts);
          setTotalRevenue(res.data.totalRevenue);
          setTotalOrders(res.data.totalOrders);
          setTotalStores(res.data.totalSellers);
        }
      } catch (error) {
        console.log(error.message || error.response?.data?.message);
      }
    })();
  }, []);
  if (loading) {
    return (
      <div className="size-full flex items-center justify-center">
        <LoadingSmallDiv />
      </div>
    );
  }
  console.log(totalStores, "is");
  return (
    <div>
      <div className="sm:mt-10 sm:ml-15 space-y-3.5">
        <h2 className="text-2xl font-semibold text-gray-500">
          Admin
          <span className="text-black"> Dashboard</span>
        </h2>
        <div className="flex sm:flex-row flex-col sm:gap-12">
          {/* For total products */}
          <div className="px-5 flex justify-between py-2 border rounded-md border-gray-100 shadow-sm space-x-4">
            <div className="flex flex-col gap-4 ">
              <span className="text-sm text-gray-500">Total Products</span>
              <span className="text-2xl font-semibold">{totalProducts}</span>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 rounded-full sm:p-6 p-2">
              <ShoppingBag size={25} className="text-gray-400 rounded-full " />
            </div>
          </div>
          {/* For total Earning */}
          <div className="px-5 flex justify-between  py-2 border rounded-md border-gray-100 shadow-sm space-x-4">
            <div className="flex flex-col gap-4 ">
              <span className="text-sm text-gray-500">Total Revenue</span>
              <span className="text-2xl font-semibold">{revenue}</span>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 rounded-full sm:p-6 p-2">
              <BadgeDollarSignIcon
                size={30}
                className="text-gray-400  rounded-full "
              />
            </div>
          </div>
          {/* Total Order */}
          <div className="px-5 flex justify-between  py-2 border rounded-md border-gray-100 shadow-sm space-x-4">
            <div className="flex flex-col gap-4 ">
              <span className="text-sm text-gray-500">Total Orders</span>
              <span className="text-2xl font-semibold">{totalOrders}</span>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 rounded-full sm:p-6 p-2">
              <Tags size={30} className="text-gray-400 rounded-full " />
            </div>
          </div>
          {/* Total rating */}
          <div className="px-5 flex justify-between  py-2 border rounded-md border-gray-100 shadow-sm space-x-4">
            <div className="flex flex-col gap-4 ">
              <span className="text-sm text-gray-500">Total Stores</span>
              <span className="text-2xl font-semibold">{totalStores}</span>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 rounded-full sm:p-6 p-2">
              <Store size={30} className="text-gray-400 rounded-sm:full10" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:py-10 flex justify-center">
        <div className="w-10/12">
          <AreaChart values={values} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
