import { useDispatch, useSelector } from "react-redux";
import {
  AppWindow,
  Dot,
  Home,
  NotebookPenIcon,
  PlusSquare,
} from "lucide-react";
import { setSection } from "../../slices/sellerSlice";
import { imageURL } from "../../utils/imageURLCheck.js";
const SellerSideBar = () => {
  const user = useSelector((state) => state.auth.user);
  const { seller, section } = useSelector((state) => state.seller);
  console.log(section);
  const dispatch = useDispatch();

  const sections = [
    {
      name: "Dashboard",
      id: "dashboard",
      icon: <Home className="sm:size-4 size-6 text-gray-500" />,
    },
    {
      name: "Add Product",
      id: "addProduct",
      icon: <PlusSquare className="sm:size-4 size-6 text-gray-500" />,
    },
    {
      name: "Manage Products",
      id: "manageProduct",
      icon: <NotebookPenIcon className="sm:size-4 size-6 text-gray-500" />,
    },
    {
      name: "Orders",
      id: "order",
      icon: <AppWindow className="sm:size-4 size-6 text-gray-500" />,
    },
  ];

  return (
    <div className=" col-span-2    gap-2.5  pt-5  border-r border-gray-300 ">
      {seller.isActive == true && (
        <div className="flex absolute top-16 sm:right-20 right-2   items-center">
          <p
            className={`text-sm flex font-semibold  items-center ${
              seller.isActive ? "text-green-500" : "text-red-400"
            }`}
          >
            <span className="text-3xl">•</span>
            {seller.isActive ? "Active" : "Not active"}
          </p>
        </div>
      )}
      <div className="flex items-center justify-center  py-3">
        <div className="flex flex-col gap-2.5 items-center">
          <div>
            {seller?.image ? (
              <img
                src={imageURL(seller?.image)}
                alt="_profile_avatar"
                className="sm:size-18 h-20 w-25 rounded-full"
              />
            ) : (
              <div className="flex justify-center items-center sm:size-13 size-6 rounded-full bg-gray-700 text-white text-xs sm:text-2xl  cursor-pointer">
                {user?.name.slice(0, 1)}
              </div>
            )}
          </div>
          <span className="sm:block hidden">{user?.name || "Seller"}</span>
        </div>
      </div>
      <div className="relative">
        {sections.map((i, index) => {
          const isActive = section === i.id;

          return (
            <div
              onClick={() => dispatch(setSection(i.id))}
              key={index}
              className={
                isActive
                  ? "pl-5 py-2.5 w-full bg-gray-200 cursor-pointer transition-colors"
                  : "pl-5 py-2.5 w-full hover:bg-gray-100 cursor-pointer transition-colors"
              }
            >
              <div className="flex sm:gap-4 items-center relative">
                {i.icon}
                <span className="text-gray-700 sm:block hidden">{i.name}</span>
                {isActive && (
                  <div className="h-9 w-1 transition-all bg-emerald-600 rounded-xl absolute right-0"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerSideBar;
