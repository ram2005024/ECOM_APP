import React, { useEffect, useState } from "react";
import LoadingScreen from "../Loading/AdminLoading";
import axios from "axios";
import toast from "react-hot-toast";
import { MapPin, NotepadTextIcon, Phone, User } from "lucide-react";
const Approve = () => {
  const [stores, setStore] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStores = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/admin/approve/store",
          {
            withCredentials: true,
          }
        );

        if (!res.data.success) {
          setLoading(false);
          toast.error(res.data.message);
          return;
        }
        console.log(res.data);
        setStore(res.data.store);
        setLoading(false);
        console.log(stores);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      }
    };
    getStores();
  }, []);
  console.log(stores);
  if (loading) {
    return <LoadingScreen />;
  }

  if (stores.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <NotepadTextIcon className="size-12 text-gray-700" />
          <span className="text-2xl text-gray-600">
            No approval requests to show
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pl-10 flex flex-col ">
        <div className="mt-8 text-2xl flex gap-2">
          <span className="text-2xl text-gray-600 ">Approve</span>Store
        </div>
        <div className="w-7/12 mt-3 border border-gray-300 rounded-lg p-7 shadow-2xs py-5">
          {stores.map((i, index) => {
            const date = new Date(i.createdAt).toLocaleDateString();
            return (
              <div key={index} className="flex flex-col  gap-2">
                <img
                  src={i?.image}
                  className="size-18 rounded-full"
                  alt="_storeLogo"
                />
                <div className="flex gap-2.5 items-center mb-5">
                  <span className="text-2xl font-semibold">{i.storename} </span>
                  <span className="text-sm text-gray-400">
                    @{i.storename.slice(0, 5)}
                    {i.id}
                  </span>
                  <span
                    className={
                      i.isApproved
                        ? "text-red-400 text-sm font-semibold rounded-lg  bg-yellow-200 p-1"
                        : "text-green-700 text-sm font-semibold  rounded-lg bg-yellow-200 p-1"
                    }
                  >
                    {i.isApproved}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {i.description}
                </p>
                <div className="mb-8 flex flex-col gap-2">
                  <div className="flex gap-2 text-gray-400 text-sm items-center">
                    <MapPin className="size-4 " />
                    <span className="text-gray-600">
                      {i?.address || "Not given"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-gray-400 text-sm items-center">
                    <Phone className="size-4 " />
                    <span className="text-gray-600">{i?.phoneNo}</span>
                  </div>
                  <div className="flex gap-2 text-gray-400 text-sm items-center">
                    <MapPin className="size-4 " />
                    <span className="text-gray-600">{i?.user.email}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  {" "}
                  Applied on {date} by
                </span>
                <div className="flex justify-between mt-3">
                  <div className="flex gap-2.5 items-center">
                    {i.user.image ? (
                      <img
                        src={i.image}
                        alt="_user_image"
                        className="size-18 rounded-full"
                      />
                    ) : (
                      <User className="size-10 bg-blue-400 p-1 rounded-full stroke-1 text-white fill-white " />
                    )}
                    <span className="text-gray-600 font-semibold">
                      {" "}
                      {i.user.name}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="bg-green-500 cursor-pointer text-white px-6 py-1.5 text-center rounded-lg transition-all hover:scale-105 active:scale-100">
                      Accept
                    </button>
                    <button className="bg-red-500 cursor-pointer text-white px-6 py-1.5 text-center rounded-lg transition-all hover:scale-105 active:scale-100">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Approve;
