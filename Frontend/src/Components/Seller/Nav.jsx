import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  return (
    <nav className="  border-b  border-gray-300 sm:px-10 flex justify-between w-full items-center">
      <img
        src="/Shoppy.png"
        alt="_logo"
        className="size-25 mt-2 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex gap-1.5  items-center">
        <span className="text-xs sm:text-sm">Hi, {user?.name}</span>
        {user?.userImage ? (
          <img
            src={user?.userImage}
            alt="_profile_avatar"
            className="size-10 rounded-full"
          />
        ) : (
          <div className="flex justify-center items-center sm:size-10 size-6 rounded-full bg-gray-700 text-white  cursor-pointer">
            {user?.name?.slice(0, 1)}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
