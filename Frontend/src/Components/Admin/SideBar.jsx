import { useDispatch, useSelector } from "react-redux";
import {
  ChartColumnBig,
  Home,
  ShieldCheck,
  StoreIcon,
  Ticket,
} from "lucide-react";
import { setSection } from "../../slices/adminSlice";
const SideBar = () => {
  const user = useSelector((state) => state.auth.user);
  const { section } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  console.log(section);
  const sections = [
    {
      name: "Dashboard",
      id: "dashboard",
      icon: <Home size={16} className="text-gray-500" />,
    },
    {
      name: "Stores",
      id: "store",
      icon: <StoreIcon size={16} className="text-gray-500" />,
    },
    {
      name: "Approve Store",
      id: "approve",
      icon: <ShieldCheck size={16} className="text-gray-500" />,
    },
    {
      name: "Coupons",
      id: "coupon",
      icon: <Ticket size={16} className="text-gray-500" />,
    },
    {
      name: "Add Category",
      id: "addCategory",
      icon: <ChartColumnBig size={16} className="text-gray-500" />,
    },
  ];
  return (
    <div className=" col-span-2 row-span-10   gap-2.5  pt-5  border-r border-gray-300 ">
      <div className="flex items-center justify-center  py-3">
        <div className="flex flex-col gap-2.5 items-start">
          <div>
            {user?.image ? (
              <img
                src={user?.image}
                alt="_profile_avatar"
                className="size-10 rounded-full"
              />
            ) : (
              <div className="flex justify-center items-center sm:size-13 size-6 rounded-full bg-gray-700 text-white text-xs sm:text-2xl  cursor-pointer">
                {user?.name?.slice(0, 1)}
              </div>
            )}
          </div>
          <span>{user?.name || "Admin"}</span>
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

export default SideBar;
