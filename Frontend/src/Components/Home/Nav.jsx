import React, { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Login from "../SignIn/Login";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user?.userName);
  const [logButton, setLogButton] = useState(false);
  const links = [
    {
      linkName: "Home",
      linkPath: "/",
    },
    {
      linkName: "Shop",
      linkPath: "/shop",
    },
    {
      linkName: "Seller",
      linkPath: "/store",
    },
    {
      linkName: "Admin",
      linkPath: "/admin",
    },
  ];
  useEffect(() => {
    if (logButton) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [logButton]);
  return (
    <nav className="flex justify-between items-center mx-auto w-10/12">
      {/* Logo section */}
      <Link to="/">
        <img
          src="/Shoppy.png"
          className="size-20 mt-2 cursor-pointer"
          alt="_logo"
        />
      </Link>

      {/* Link section */}
      <div className="flex gap-4 items-center">
        {links.map((i, index) => {
          return (
            <Link
              id={index}
              to={i.linkPath}
              className="text-gray-900 hover:text-gray-600"
            >
              {i.linkName}
            </Link>
          );
        })}
        <div className="flex gap-5 items-center">
          <div className="relative ml-3">
            <input
              type="text"
              placeholder="Search Products"
              className="bg-gray-200 rounded-full p-3 pl-12 text-sm focus:outline-none "
            />
            <Search size={18} className="absolute top-3 left-3 " />
          </div>
          <div className="flex gap-1.5 items-center cursor-pointer hover:text-gray-600">
            <ShoppingCart size={18} />
            <span>Cart</span>
          </div>
          {/* <button
            onClick={() => setLogButton(true)}
            className="rounded-full bg-emerald-700 text-center py-2 px-8 cursor-pointer hover:bg-emerald-600 text-white"
          >
            Login
          </button> */}
          {user?.userID ? (
            <button className="text-center size-10 rounded-full bg-gray-700 text-white cursor-pointer">
              {user?.userName?.slice(0, 1)}
            </button>
          ) : (
            <button
              onClick={() => setLogButton(true)}
              className="rounded-full bg-emerald-700 text-center py-2 px-8 cursor-pointer hover:bg-emerald-600 text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {/* For login Button when someone clicks Sign in */}
      {logButton && <Login setLogButton={setLogButton} />}
    </nav>
  );
};

export default Nav;
