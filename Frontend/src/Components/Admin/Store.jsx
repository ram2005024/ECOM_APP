import React, { useEffect, useState } from "react";
import LoadingSmallDiv from "../Loading/LoadingSmallDiv";
import axios from "axios";
import { imageURL } from "../../utils/imageURLCheck.js";
import { Mail, MapPin, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
const Store = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleIsActiveSeller = async (value, storeId) => {
    const isConfirm = window.confirm(
      "Are you sure to change the active status?"
    );
    if (isConfirm) {
      setLoading(true);
      try {
        await toast.promise(
          axios.post(
            import.meta.env.VITE_SERVER_URL + "/admin/status",
            {
              value,
              storeId,
            },
            {
              withCredentials: true,
            }
          ),
          {
            loading: "Setting status...",
            success: (res) => {
              if (!res.data.success) {
                throw new Error(res.data.message);
              }
              return res.data.message;
            },
            error: (error) => {
              return (
                error.message ||
                error.response?.message ||
                "Something went wrong"
              );
            },
          }
        );
        await loadStores();
        return;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else return;
  };
  //Load store
  const loadStores = async () => {
    try {
      setLoading(true);
      // Get all the store
      const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/store/getAllStores",
        {
          withCredentials: true,
        }
      );
      if (!res.data.success) {
        setStores([]);
        return;
      }
      setStores(res.data.sellers);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadStores();
  }, []);
  console.log(stores);
  if (loading) {
    return (
      <div className="size-full items-center justify-center">
        <LoadingSmallDiv />
      </div>
    );
  }
  return (
    <div className="sm:mt-10 sm:ml-15">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl text-gray-500">
          Live <span className="text-black">Stores</span>
        </h2>
        <div className="flex flex-col gap-3.5 sm:p-auto pl-3 pb-10">
          {stores &&
            [...stores]
              .sort((a, b) => a.id - b.id)
              .map((i) => {
                return (
                  <div
                    key={i.id}
                    className="w-full sm:text-sm text-xs  border  border-gray-200 shadow-md rounded-md sm:px-6 px-2 sm:py-6 py-2 flex flex-col gap-2.5"
                  >
                    <div>
                      <img
                        src={imageURL(i.image)}
                        className="size-20 rounded-full shadow-sm"
                        alt={`store_${i.id}_image`}
                      />
                    </div>
                    <div className="flex sm:gap-4 gap-2 items-center">
                      <strong className="sm:text-xl text-sm   font-semibold">
                        {i.storename}
                      </strong>
                      <span className="sm:text-sm text-xs  text-gray-500">
                        @{i.storename}
                      </span>
                      <span className="bg-slate-100 rounded-full text-xs px-3 p-1.5 font-semibold">
                        {i.isApproved}
                      </span>
                    </div>
                    <p className="sm:text-sm text-xs  text-gray-600">
                      {i.description}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex gap-1.5 items-center">
                        <MapPin className="size-4 text-gray-500" />
                        <span className="sm:text-sm text-xs  text-gray-500">
                          {i.address}
                        </span>
                      </div>
                      <div className="flex gap-1.5 items-center">
                        <Phone className="size-4 text-gray-500" />
                        <span className="sm:text-sm text-xs  text-gray-500">
                          {i.phoneNo}
                        </span>
                      </div>
                      <div className="flex gap-1.5 items-center">
                        <Mail className="size-4 text-gray-500" />
                        <span className="sm:text-sm text-xs  text-gray-500">
                          {i.user.email}
                        </span>
                      </div>
                    </div>
                    <span className="sm:text-sm text-xs  mt-3 text-gray-500">
                      Applied on {new Date(i.createdAt).toLocaleDateString()} by
                    </span>
                    <div className="flex justify-between">
                      <div className="flex gap-1.5 items-center">
                        {i.user.image ? (
                          <img
                            src={imageURL(i.user.image)}
                            className="size-12 rounded-full"
                            alt={`_user_${i.user.id}_image`}
                          />
                        ) : (
                          <div>
                            <User className="size-8 p-1.5 rounded-full bg-sky-500 fill-white text-white" />
                          </div>
                        )}
                        <div className="flex flex-col ">
                          <span className="sm:text-sm text-xs  text-gray-700 font-semibold">
                            {" "}
                            {i.user.name}
                          </span>
                          <span className="sm:text-sm text-xs text-gray-400">
                            {i.user.email}
                          </span>
                        </div>
                      </div>
                      <div className="flex sm:flex-row flex-col gap-2 items-center">
                        <span>Active</span>

                        <label>
                          <div
                            className={`rounded-full sm:w-10 sm:h-5 w-8 h-4 flex items-center justify-start ${
                              i.isActive ? "bg-green-400" : "bg-gray-400"
                            }`}
                          >
                            <div
                              className={`rounded-full sm:size-5 size-3  bg-white transition-transform ${
                                i.isActive ? "translate-x-4" : "translate-x-0"
                              }`}
                            ></div>
                          </div>

                          <input
                            checked={i.isActive}
                            onChange={(e) =>
                              handleIsActiveSeller(e.target.checked, i.id)
                            }
                            type="checkbox"
                            disabled={loading}
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Store;
