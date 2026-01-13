import React, { useEffect, useState } from "react";
import { Crown, Menu, Search, ShoppingCart } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "../SignIn/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import ShowProfile from "../Nav/ShowProfile";
import { setShowProfile } from "../../slices/profileSlice.jsx";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  const { showProfile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cart);
  const [logButton, setLogButton] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();
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
      linkName: "Contact",
      linkPath: "/contact",
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
  useEffect(() => {
    if (showSideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [showSideBar]);
  return (
    <nav className="flex pl-10 sm:justify-between relative  items-center sm:mx-auto w-10/12">
      {/* Logo section */}

      <Link to="/" className="relative">
        <img
          src="/Shoppy.png"
          className="size-20 mt-2 cursor-pointer"
          alt="_logo"
        />
        {user?.plusMember && (
          <span className="text-sm sm:block hidden bg-emerald-600 text-white absolute font-semibold  -right-9 top-4  rounded-full text-center py-1 w-11">
            plus
          </span>
        )}
      </Link>

      {/* Link section */}
      <div className="flex gap-2  sm:gap-4 items-center">
        <div className="sm:block hidden space-x-4">
          {links.map((i, index) => {
            return (
              <Link
                id={index}
                to={i.linkPath}
                className="text-gray-900 sm:text-sm text-xs hover:text-gray-600"
              >
                {i.linkName}
              </Link>
            );
          })}
          {user?.role === "seller" && (
            <Link
              to="/store"
              className="text-gray-900 sm:text-sm text-xs hover:text-gray-600"
            >
              Seller
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-gray-900 sm:text-sm text-xs hover:text-gray-600"
            >
              Admin
            </Link>
          )}
        </div>
        <div className="flex gap-2 sm:gap-5 items-center">
          <div className="relative ml-6">
            <input
              type="text"
              placeholder="Search Products"
              className="bg-gray-200 rounded-full p-2 sm:p-3 pl-8 sm:pl-12 text-xs sm:text-sm focus:outline-none "
            />
            <Search className="size-3.5 absolute top-2 left-3 sm:left-5 sm:top-3.5 sm:right-5" />
          </div>
          <div
            onClick={() => navigate("/cart")}
            className="flex gap-1.5 items-center cursor-pointer hover:text-gray-600"
          >
            <div className="relative">
              <ShoppingCart size={18} />
              <div className="w-4 h-4 absolute -top-2 -right-2  rounded-full text-xs bg-slate-600 text-white flex items-center justify-center">
                <span className="text-xs">{totalItems}</span>
              </div>
            </div>
            <span>Cart</span>
          </div>
          {/* <button
            onClick={() => setLogButton(true)}
            className="rounded-full bg-emerald-700 text-center py-2 px-8 cursor-pointer hover:bg-emerald-600 text-white"
            >
            Login
            </button> */}
          {user && user?.id ? (
            <button
              onClick={(e) => {
                e.stopPropagation();

                dispatch(setShowProfile());
              }}
              className="text-center m-4 size-10 rounded-full  bg-gray-700 text-white cursor-pointer relative"
            >
              {user?.image ? (
                <img
                  src={user?.image}
                  alt={`user_${user?.id}_image`}
                  className="rounded-full"
                />
              ) : (
                user?.name.slice(0, 1)
              )}
              {showProfile && <ShowProfile />}
              {user?.plusMember && (
                <span className="absolute font-medium sm:hidden block right-2 -top-5 ">
                  <Crown className="text-yellow-400 fill-yellow-400" />
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setLogButton(true);
              }}
              className="sm:rounded-full rounded-xl bg-emerald-700 text-center py-2 sm:px-8 px-4 cursor-pointer hover:bg-emerald-600 text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {/* For login Button when someone clicks Sign in */}
      {logButton && <Login setLogButton={setLogButton} />}
      {/* Responsive nav bar */}

      <div className="absolute block sm:hidden left-7 top-8">
        <Menu
          onClick={() => setShowSideBar((prev) => !prev)}
          className="size-6 cursor-pointer "
        />
      </div>
      {/* Side bar for mobile phones */}
      {showSideBar && (
        <>
          <div
            onClick={() => setShowSideBar((prev) => !prev)}
            className="fixed inset-0 z-40 bg-black/30"
          />
        </>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className={`h-screen w-60 fixed  left-0 top-0 z-50 text-black bg-white  flex flex-col transform transition-transform duration-300 ${
          showSideBar
            ? "translate-x-0 pointer-events-auto"
            : "-translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex gap-2 items-center bg-gradient-to-r from purple-500 to bg-indigo-700 justify-between">
          <div className="flex gap-2 items-center pt-2">
            <Menu
              onClick={() => setShowSideBar((prev) => !prev)}
              className="size-6 absolute stroke-3 right-4 cursor-pointer text-white"
            />
            <div>
              <img src="/Shoppy.png" className="w-12 h-18" alt="_logo" />
            </div>
            <span className="font-bold text-white font-sans text-2xl ">
              Shoppy <span className="text-red-500"> Go</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col font-medium text-sm text-slate-950 items-center space-y-5 mt-6">
          {links.map((i, index) => {
            return (
              <div className="flex gap-4 items-center ">
                <Link
                  onClick={() => setShowSideBar((prev) => !prev)}
                  id={index}
                  to={i.linkPath}
                  className="text-gray-600 sm:text-sm text-xs hover:text-gray-600"
                >
                  {i.linkName}
                </Link>
              </div>
            );
          })}

          {user?.role === "seller" && (
            <div className="border-t w-full border-gray-100 flex items-center justify-center pt-4">
              <Link
                onClick={() => setShowSideBar((prev) => !prev)}
                to="/store"
                className="text-white bg-orange-600 tracking-wide w-11/12 p-3 font-semibold  rounded-lg text-center text-sm sm:text-sm  hover:text-gray-600"
              >
                Seller
              </Link>
            </div>
          )}
          {user?.role === "admin" && (
            <div className="border-t w-full border-gray-100 flex items-center justify-center pt-4">
              <Link
                onClick={() => setShowSideBar((prev) => !prev)}
                to="/admin"
                className="text-white bg-indigo-600 w-11/12 p-3 font-semibold  rounded-lg text-center text-sm sm:text-sm  hover:text-gray-600"
              >
                Admin Panel
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
