import React, { useEffect, useState } from "react";
import LoadingScreen from "../Loading/AdminLoading";
import axios from "axios";
import toast from "react-hot-toast";
import { MapPin, NotepadTextIcon, Phone, User, X } from "lucide-react";
import { imageURL } from "../../utils/imageURLCheck.js";
const Approve = () => {
  const [stores, setStore] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);
  const [rejectDes, setRejectDes] = useState("");
  const [storeID, setStoreID] = useState();
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
        setStore(res.data.store);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      }
    };
    getStores();
  }, []);
  // handle accept-----------------------------
  const handleAccept = async (storeid) => {
    if (confirm("Are you sure want to approve this store?")) {
      try {
        const res = await toast.promise(
          axios.post(
            import.meta.env.VITE_SERVER_URL + "/admin/status/approve",
            { storeid },
            {
              withCredentials: true,
            }
          ),
          {
            loading: "Approving store...",
            success: "Store approved",
            error: "Error occured",
          }
        );
        if (!res.data.success) {
          toast.error(res.data.message);
          return;
        }
        setStore((prev) => prev.filter((i) => i?.id !== storeid));
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  //handle reject
  const handleReject = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure want to reject this store?")) {
      try {
        const res = await toast.promise(
          axios.post(
            import.meta.env.VITE_SERVER_URL + "/admin/status/reject",
            { storeID, rejectDes },
            {
              withCredentials: true,
            }
          ),
          {
            loading: "Rejecting store...",
            success: "Store rejected",
            error: "Error occured",
          }
        );
        if (!res.data.success) {
          toast.error(res.data.message);
          return;
        }
        setStore((prev) => prev.filter((i) => i?.id !== storeID));
      } catch (error) {
        console.log(error);
      } finally {
        setStoreID(0);
      }
    } else {
      return;
    }
  };
  if (loading) {
    return <LoadingScreen />;
  }
  console.log("this", stores);
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
      <div className="sm:pl-10 pl-3 flex flex-col ">
        <div className="mt-8 text-2xl flex gap-2">
          <span className="text-2xl text-gray-600 ">Approve</span>Store
        </div>
        {stores.map((i, index) => {
          const date = new Date(i.createdAt).toLocaleDateString();
          return (
            <div
              key={index}
              className="sm:w-7/12 w-11/12 mt-3 mb-6 border border-gray-300 rounded-lg p-7 shadow-2xs py-5"
            >
              <div className="flex flex-col  gap-2">
                <img
                  src={imageURL(i?.image)}
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
                        className="sm:size-8 size-6 rounded-full"
                      />
                    ) : (
                      <User className="sm:size-10 size-8 bg-blue-400 p-1 rounded-full stroke-1 text-white fill-white " />
                    )}
                    <span className="text-gray-600 text-xs sm:text-sm font-semibold">
                      {" "}
                      {i.user.name}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleAccept(i.id)}
                      className="bg-green-500 cursor-pointer text-white  sm:px-6 sm:py-1.5 py-1.5 px-3   text-center rounded-lg transition-all hover:scale-105 active:scale-100"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setRejectStatus(true);
                        setStoreID(i.id);
                      }}
                      className="bg-red-500 cursor-pointer text-white sm:px-6 sm:py-1.5 py-1.5 px-3 text-center rounded-lg transition-all hover:scale-105 active:scale-100"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {rejectStatus && (
          <div
            onClick={() => setRejectStatus(false)}
            className="absolute inset-0 bg-black/35 backdrop-blur-sm flex items-center justify-center"
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => handleReject(e)}
              className="px-4 py-5 flex flex-col relative sm:w-1/3 w-10/12 bg-slate-100 rounded-lg gap-4"
            >
              <h2 className="text-xl text-center font-semibold">
                Rejecting reason
              </h2>
              <textarea
                type="text"
                value={rejectDes}
                onChange={(e) => setRejectDes(e.target.value)}
                placeholder="Enter description"
                rows={8}
                className="border border-gray-300 pl-3 outline-none resize-none rounded-lg focus:ring focus:ring-gray-400"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 rounded-md text-white font-semibold cursor-pointer"
              >
                Submit
              </button>
              <X
                size={20}
                onClick={() => setRejectStatus(false)}
                className="text-red cursor-pointer transform transition-all hover:scale-110 hover:text-red-400 absolute top-3 right-4"
              />
            </form>
          </div>
        )}
      </div>
    );
  }
};

export default Approve;
