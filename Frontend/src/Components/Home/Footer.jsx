import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const Footer = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32  mx-auto">
        <div class="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
          <div class="max-w-8/12">
            <img
              src="/Shoppy.png"
              alt="_logo"
              className=" cursor-pointer w-25 h-20"
            />
            <p class="mt-6 text-sm text-gray-500">
              ShoppyGo is a dynamic online marketplace where multiple vendors
              can showcase and sell their products under one roof. It empowers
              sellers with easy store management tools while giving customers a
              seamless shopping experience across diverse categories.
            </p>
            <div class="flex items-center gap-2 mt-3">
              <a href="https://x.com/shekhar_1010">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  color="gray"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.167 2.5a9.1 9.1 0 0 1-2.617 1.275 3.733 3.733 0 0 0-6.55 2.5v.833a8.88 8.88 0 0 1-7.5-3.775s-3.333 7.5 4.167 10.833a9.7 9.7 0 0 1-5.834 1.667C8.333 20 17.5 15.833 17.5 6.25q0-.35-.067-.692A6.43 6.43 0 0 0 19.167 2.5"
                    stroke="#2563EB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
              <a href="https://github.com/ram2005024">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 15.833c-4.167 1.25-4.167-2.084-5.833-2.5m11.666 5v-3.225a2.8 2.8 0 0 0-.783-2.175c2.616-.292 5.366-1.283 5.366-5.833a4.53 4.53 0 0 0-1.25-3.125 4.22 4.22 0 0 0-.075-3.142s-.983-.292-3.258 1.233a11.15 11.15 0 0 0-5.833 0C5.225.541 4.242.833 4.242.833a4.22 4.22 0 0 0-.075 3.142 4.53 4.53 0 0 0-1.25 3.15c0 4.516 2.75 5.508 5.366 5.833a2.8 2.8 0 0 0-.783 2.15v3.225"
                    stroke="#2563EB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ram-sharma-7b8426316/">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.333 6.667a5 5 0 0 1 5 5V17.5H15v-5.833a1.667 1.667 0 0 0-3.334 0V17.5H8.333v-5.833a5 5 0 0 1 5-5M5 7.5H1.667v10H5zM3.333 5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333"
                    stroke="#2563EB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
            <div>
              <h2 class="font-semibold text-gray-900 mb-5">RESOURCES</h2>
              <ul class="text-sm text-gray-500 space-y-2 list-none">
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Tutorials</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Community</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="font-semibold text-gray-900 mb-5">COMPANY</h2>
              <div class="text-sm text-gray-500 space-y-2 list-none">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                {!user?.plusMember &&
                  user?.role !== "seller" &&
                  user?.role !== "admin" && (
                    <li>
                      <Link to="/plus">Become a plus member</Link>
                    </li>
                  )}
                {user?.role === "customer" && (
                  <li>
                    <Link to="/seller/subscription">Become a seller</Link>
                  </li>
                )}
              </div>
            </div>
          </div>
        </div>
        <p class="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2026 © <a href="https://github.com/ram2005024">ShoppyGo</a>.
          All Right Reserved.
        </p>
      </footer>
    </div>
  );
};
