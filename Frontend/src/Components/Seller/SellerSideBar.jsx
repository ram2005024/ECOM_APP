import { useDispatch, useSelector } from "react-redux";
import {
  AppWindow,
  Dot,
  Home,
  NotebookPenIcon,
  PlusSquare,
} from "lucide-react";
import { setSection } from "../../slices/sellerSlice";
const SellerSideBar = () => {
  const user = useSelector((state) => state.auth.user);
  const { seller, section } = useSelector((state) => state.seller);
  console.log(section);
  const dispatch = useDispatch();

  const sections = [
    {
      name: "Dashboard",
      id: "dashboard",
      icon: <Home size={16} className="text-gray-500" />,
    },
    {
      name: "Add Product",
      id: "addProduct",
      icon: <PlusSquare size={16} className="text-gray-500" />,
    },
    {
      name: "Manage Products",
      id: "manageProduct",
      icon: <NotebookPenIcon size={16} className="text-gray-500" />,
    },
    {
      name: "Orders",
      id: "order",
      icon: <AppWindow size={16} className="text-gray-500" />,
    },
  ];
  return (
    <div className=" col-span-2    gap-2.5  pt-5  border-r border-gray-300 ">
      {seller.isActive == true && (
        <div className="flex absolute top-15 sm:right-15 right-3 items-center">
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
                src={seller?.image}
                alt="_profile_avatar"
                className="size-18 rounded-full"
              />
            ) : (
              <div className="flex justify-center items-center sm:size-13 size-6 rounded-full bg-gray-700 text-white text-xs sm:text-2xl  cursor-pointer">
                {user?.name.slice(0, 1)}
              </div>
            )}
          </div>
          <span>{user?.name || "Seller"}</span>
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
              <div className="flex gap-4 items-center relative">
                {i.icon}
                <span className="text-gray-700">{i.name}</span>
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
