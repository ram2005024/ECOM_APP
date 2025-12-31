import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FileType,
  Notebook,
  Phone,
  Store,
  UploadCloud,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { createSeller } from "../../slices/sellerSlice";

export default function SellerIfRejectedForm() {
  const seller = useSelector((state) => state.seller.seller);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [storename, setStoreName] = useState(seller?.storename || "");
  const [storeDescription, setDescription] = useState(
    seller?.description || ""
  );
  const [storeType, setStoreType] = useState(seller?.type || "");
  const [phnNo, setPhnNo] = useState(seller?.phoneNo || "");
  const [add, setAdd] = useState(seller?.address || "");
  const [files, setFiles] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sellerFormEntries = [
    {
      id: "Store name",
      icon: Store,
      type: "text",
      placeholder: "Enter your store name",
      value: storename,
      setter: setStoreName,
    },
    {
      id: "Store description",
      type: "textarea",
      value: storeDescription,
      setter: setDescription,
      icon: Notebook,
      placeholder: "Enter your store description",
    },
    {
      id: "Phone number",
      type: "text",
      value: phnNo,
      setter: setPhnNo,
      icon: Phone,
      placeholder: "Enter your contact number",
    },
    {
      id: "Address",
      type: "text",
      value: add,
      setter: setAdd,
      icon: MapPin,
      placeholder: "Enter your store address",
    },
    {
      id: "Store type",
      type: "text",
      value: storeType,
      setter: setStoreType,
      icon: FileType,
      placeholder: "Enter your store type",
    },
  ];

  const handleStoreFormSubmit = async (e) => {
    e.preventDefault();

    if (!files) {
      toast.error("Please upload a store image");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", storename);
    formData.append("des", storeDescription);
    formData.append("type", storeType);
    formData.append("userID", user?.id);
    formData.append("phone", phnNo);
    formData.append("address", add);
    formData.append("storeImage", files);
    formData.append("sellerId", seller?.id);

    if (confirm("Are you sure you want to reapply with updated information?")) {
      try {
        const res = await toast.promise(
          axios.post(
            import.meta.env.VITE_SERVER_URL + "/store/reapply",
            formData,
            {
              withCredentials: true,
            }
          ),
          {
            loading: "Resubmitting store details...",
            success: "Store reapplication submitted",
            error: "Error occurred",
          }
        );
        if (!res?.data?.success) {
          toast.error(res?.data?.message || "Something went wrong");
          setIsSubmitting(false);
          return;
        }
        dispatch(createSeller(res?.data?.seller));
        setStoreName("");
        setDescription("");
        setStoreType("");
        setPhnNo("");
        setAdd("");
        setFiles(null);
        setIsSubmitting(false);
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Failed to reapply");
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full sm:max-w-lg gap-4 mt-10 shadow-lg rounded-lg bg-white p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-2">
          <div className="flex items-start gap-3">
            <AlertCircle
              className="text-red-600 flex-shrink-0 mt-1"
              size={20}
            />
            <div>
              <h3 className="text-sm font-semibold text-red-800 mb-2">
                Application Rejected - Please Review
              </h3>
              <p className="text-xs text-red-700 leading-relaxed">
                {seller?.reasonForRejection ||
                  "Your application needs revision. Please address the issues below and reapply."}
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-900 mt-4">
          Reapply with Updated Information
        </h2>

        <div className="flex flex-col gap-4">
          {sellerFormEntries.map((field, index) => {
            const Icon = field.icon;
            return (
              <div key={index} className="flex flex-col gap-2">
                <label
                  htmlFor={field.id}
                  className="text-sm font-semibold text-gray-700"
                >
                  {field.id}
                </label>
                <div className="relative w-full">
                  <Icon
                    size={16}
                    className="absolute left-3 top-3 text-gray-400 pointer-events-none z-10"
                  />
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                      rows={4}
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Store Image
            </label>
            <label
              htmlFor="store_image"
              className="flex flex-col justify-center items-center min-h-40 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 cursor-pointer transition bg-gray-50"
            >
              {files ? (
                <div className="text-center space-y-2">
                  <UploadCloud size={32} className="text-green-500 mx-auto" />
                  <p className="text-sm font-medium text-gray-800">
                    {files.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(files.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <UploadCloud
                    size={32}
                    className="text-gray-400 mx-auto hover:text-red-500 transition"
                  />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload new image
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
              <input
                id="store_image"
                type="file"
                hidden
                required
                disabled={isSubmitting}
                onChange={(e) => setFiles(e.target.files[0])}
                accept="image/jpeg,image/png"
              />
            </label>
          </div>

          <button
            onClick={handleStoreFormSubmit}
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Reapplying...
              </>
            ) : (
              "Reapply Now"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Make sure to address all the issues mentioned above before
            reapplying.
          </p>
        </div>
      </div>
    </div>
  );
}
