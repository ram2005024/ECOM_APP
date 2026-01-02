import axios from "axios";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ManageProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/product/get",
          {
            params: {
              sellerId: seller.id,
            },
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          setLoading(false);
          toast.error("Error fetching data");
          return;
        }
        setProducts(res.data.products);
        console.log("Yo", res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setFetching(false);
      }
    };
    getProduct();
    console.log(products);
  }, []);
  const handleToggle = async (pid, value) => {
    setLoading(true);
    try {
      const res = await toast.promise(
        axios.post(
          import.meta.env.VITE_SERVER_URL + "/product/handleShow",
          {
            pid,
            value,
            sellerId: seller.id,
          },
          {
            withCredentials: true,
          }
        ),
        {
          loading: "Setting status..",
          success: value ? "Activated" : "Deactivated",
          error: "Error occured",
        }
      );
      if (res.data.success) {
        setLoading(false);
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (fetching) {
    return (
      <div className="col-span-10 flex items-center justify-center  bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-blue-600" size={48} />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="col-span-10">
      <div className="flex flex-col gap-8 ml-10 mt-10  ">
        <h2 className="text-gray-500 text-2xl">
          Manage <span className="text-black">Product</span>
        </h2>
        <table className="table-fixed w-10/12 border-collapse border border-slate-300 rounded-lg">
          <thead className="bg-slate-200">
            <tr className="border border-gray-300  ">
              <th className="p-4 text-sm text-gray-900">Name</th>
              <th className="p-4 text-sm text-gray-900">Description</th>
              <th className="p-4 text-sm text-gray-900">MRP</th>
              <th className="p-4 text-sm text-gray-900">Price</th>
              <th className="p-4 text-sm text-gray-900">In Stock</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {products.map((i) => {
              return (
                <tr
                  key={i.id}
                  className="border border-gray-200 transition-all cursor-pointer hover:bg-gray-100 "
                >
                  <td className=" p-2 flex gap-3">
                    <div className="w-20 h-12 rounded-sm border bg-white border-gray-200   flex items-center justify-center   ">
                      <img
                        src={i.image[0]}
                        alt="_pImage"
                        className="h-7 w-8 "
                      />
                    </div>

                    <span>{i.name}</span>
                  </td>
                  <td className=" p-2 text-center">
                    {i.description.length > 30
                      ? i.description.substring(0, 30) + "..."
                      : i.description}
                  </td>
                  <td className=" text-center">${i.price}</td>
                  <td className=" text-center">${i.price - i.offerPrice}</td>
                  <td className=" p-2 text-center">
                    <button>
                      <label className="inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="sr-only "
                          disabled={loading}
                          onChange={(e) => {
                            handleToggle(i.id, e.target.checked);
                          }}
                        />
                        <div
                          className={`w-10 h-5 rounded-full  flex items-center  ${
                            i.show ? "bg-green-600" : "bg-gray-400"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full  transition transform  bg-white ${
                              i.show ? "translate-x-5" : "translate-x-1"
                            }`}
                          ></div>
                        </div>
                      </label>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
