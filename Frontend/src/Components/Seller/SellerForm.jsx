import React, { useState } from "react";
import {
  FileType,
  Image,
  LocationEdit,
  Notebook,
  Phone,
  Store,
  StoreIcon,
  UploadCloud,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createSeller } from "../../slices/sellerSlice";
const SellerForm = () => {
  const [storename, setStoreName] = useState("");
  const [storeDescription, setDescription] = useState("");
  const [storeType, setStoreType] = useState("");
  const [phnNo, setPhnNo] = useState("");
  const [add, setAdd] = useState("");
  const [files, setFiles] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const sellerFormEntries = [
    {
      id: "Store name",
      icon: (
        <Store size={14} className="absolute top-10 left-4 text-gray-600" />
      ),
      type: "text",
      placeholder: "Enter your store name",
      value: storename,
      setter: setStoreName,
    },
    {
      id: "Store description",
      type: "text",
      value: storeDescription,
      setter: setDescription,
      icon: (
        <Notebook size={14} className="absolute top-10 left-4 text-gray-600" />
      ),
      placeholder: "Enter your store description",
    },

    {
      id: "Phone number",
      type: "text",
      value: phnNo,
      setter: setPhnNo,
      icon: (
        <Phone size={14} className="absolute top-10 left-4 text-gray-600" />
      ),
      placeholder: "Enter your contact no.",
    },
    {
      id: "Address",
      type: "text",
      value: add,
      setter: setAdd,
      icon: (
        <LocationEdit
          size={14}
          className="absolute top-10 left-4 text-gray-600"
        />
      ),
      placeholder: "Enter your store address",
    },

    {
      id: "Store type",
      type: "text",
      value: storeType,
      setter: setStoreType,
      icon: (
        <FileType size={14} className="absolute top-10 left-4 text-gray-600" />
      ),
      placeholder: "Enter your store type",
    },
  ];
  const handleStoreFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", storename);
    formData.append("des", storeDescription);
    formData.append("type", storeType);
    formData.append("userID", user?.id);
    formData.append("phone", phnNo);
    formData.append("address", add);
    formData.append("storeImage", files);

    if (confirm("Are you sure want to save the store info")) {
      try {
        const res = await toast.promise(
          axios.post(
            import.meta.env.VITE_SERVER_URL + "/store/register",

            formData,

            {
              withCredentials: true,
            }
          ),
          {
            loading: "Saving store details...",
            success: "Submitted store detail",
            error: "Error occured",
          }
        );
        if (!res.data.success) {
          toast.error(res.data.message);
          return;
        }
        dispatch(createSeller(res.data.seller));
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      return;
    }
  };
  return (
    <div className=" flex justify-center ">
      <form
        onSubmit={(e) => handleStoreFormSubmit(e)}
        className=" flex p-3 flex-col h-fit sm:min-w-lg gap-2.5 mt-10 shadow-lg rounded-lg bg-slate-100"
      >
        <h2 className="text-center text-cl font-semibold text-gray-900">
          Please submit the store information
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {sellerFormEntries.map((i, index) => {
            const Icon = i.icon;
            return (
              <div className="flex flex-col gap-1.5 relative">
                <label key={index} htmlFor={i.id}>
                  {i.id}
                </label>
                <input
                  type={i.type}
                  placeholder={i.placeholder}
                  value={i.value}
                  required
                  onChange={(e) => i.setter(e.target.value)}
                  className="p-1.5 bg-gray-200 rounded-lg outline-none pl-10"
                />
                {Icon}
              </div>
            );
          })}
          <div className="flex mb-8 flex-col justify-center items-center border border-dashed border-gray-500  p-10 mt-5 bg-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer">
            {files ? (
              <h2 className="text-sm text-slate-800 cursor-pointer">
                Selected : {files.name}
              </h2>
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud
                  size={18}
                  className="text-gray-600 transform transition-all hover:scale-105 mr-2.5"
                />

                <label
                  htmlFor="store_image"
                  className="text-sm text-slate-800 cursor-pointer"
                >
                  Upload image
                </label>
                <input
                  id="store_image"
                  type="file"
                  hidden
                  required
                  onChange={(e) => setFiles(e.target.files[0])}
                  accept="image/jpeg image/png"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 rounded-lg text-white p-2.5 cursor-pointer"
          >
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerForm;
