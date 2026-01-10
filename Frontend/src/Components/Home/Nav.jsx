import React, { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
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
  return (
    <nav className="flex justify-between  items-center mx-auto w-10/12">
      {/* Logo section */}
      <Link to="/" className="relative">
        <img
          src="/Shoppy.png"
          className="size-20 mt-2 cursor-pointer"
          alt="_logo"
        />
        {user?.plusMember && (
          <span className="text-sm bg-emerald-600 text-white absolute font-semibold  -right-9 top-4  rounded-full text-center py-1 w-11">
            plus
          </span>
        )}
      </Link>

      {/* Link section */}
      <div className="flex gap-2  sm:gap-4 items-center">
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
        <div className="flex gap:2 sm:gap-5 items-center">
          <div className="relative ml-3">
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
          {user?.id ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setShowProfile());
              }}
              className="text-center size-10 rounded-full bg-gray-700 text-white cursor-pointer relative"
            >
              {user?.name?.slice(0, 1)}
              {showProfile && <ShowProfile />}
            </button>
          ) : (
            <button
              onClick={() => {
                setLogButton(true);
              }}
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
