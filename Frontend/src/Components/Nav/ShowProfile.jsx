import axios from "axios";
import { Cuboid, LogOut } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { deleteCart } from "../../slices/cartSlice";
import {
  setShowProfile,
  setShowProfileProtected,
} from "../../slices/profileSlice";
import { useNavigate } from "react-router-dom";

const ShowProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/auth/user/logout",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(logout());
        dispatch(deleteCart());
        dispatch(setShowProfile(false));
        dispatch(setShowProfileProtected(false));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute top-15 right-2 flex gap-4  z-50 flex-col bg-white border border-gray-100 shadow-xl sm:w-sm w-auto rounded-lg"
    >
      <div className="flex gap-2.5 ">
        {/* Avatar */}
        <div className="ml-3">
          {user?.userImage ? (
            <img
              src={user?.userImage}
              alt="_profile_avatar"
              className="size-10 rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center size-10 rounded-full bg-gray-700 text-white  cursor-pointer">
              {user?.name?.slice(0, 1)}
            </div>
          )}
        </div>
        <div className="flex flex-col  text-sm items-start">
          <span className=" text-gray-800 font-bold">{user.name}</span>
          <span className="text-gray-500">{user.email}</span>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3 text-gray-500 ">
        <div
          onClick={() => {
            navigate("/orders");
            dispatch(setShowProfile(false));
            dispatch(setShowProfileProtected(false));
          }}
          className="flex gap-1.5 items-center w-full hover:bg-gray-100 cursor-pointer p-2.5"
        >
          <Cuboid className="size-4 " />
          <span className="text-sm">My orders</span>
        </div>
        <div
          className="flex gap-1.5 items-center w-full hover:bg-gray-100 cursor-pointer p-2.5"
          onClick={() => {
            handleLogout();
          }}
        >
          <LogOut className="size-4  " />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
