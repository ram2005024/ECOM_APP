import axios from "axios";
import { UploadCloud } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryID] = useState();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [actualPrice, setActualPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { seller } = useSelector((state) => state.seller);

  const analyzeImage = async (file) => {
    if (files.length <= 1) {
      try {
        const form = new FormData();
        form.append("image", file);
        setLoading(true);
        const res = await toast.promise(
          axios.post(
            import.meta.env.VITE_SERVER_URL + "/product/analyzeImage",
            form,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          ),
          {
            loading: "Analyzing image....",
            error: "Error to analyze image",
            success: "Successfully analyzed",
          }
        );
        setProductName(res.data.output.title);
        setProductDescription(res.data.output.description);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Failed to analyze image");
      }
    }
    return;
  };
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) alert("Please insert at least one image");
    setLoading(true);
    try {
      const form = new FormData();
      const productDetails = {
        productName,
        productDescription,
        categoryId,
        offerPrice,
        actualPrice,
        sellerId: seller.id,
      };
      files.forEach((i) => form.append("image", i));
      Object.entries(productDetails).forEach(([key, value]) => {
        form.append(key, value);
      });
      await toast.promise(
        axios.post(
          import.meta.env.VITE_SERVER_URL + "/product/addProduct",
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        ),
        {
          loading: "Saving product...",
          error: "Failed to save product",
          success: "Added product",
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setFiles([]);
      setOfferPrice(0);
      setActualPrice(0);
      setCategoryID();
      setProductDescription("");
      setProductName("");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (files.length === 1 && files[0]) {
      analyzeImage(files[0]);
    }
  }, [files]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/admin/getCategory",
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          setCategories(null);
          return;
        }
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  return (
    <div className="col-span-10">
      <form
        onSubmit={(e) => handleProductSubmit(e)}
        className="flex flex-col gap-3.5 m-10"
      >
        <h2 className="text-2xl  text-gray-500">
          Add New <span className="text-black">Products</span>
        </h2>
        <span className="text-gray-500">Product image</span>
        <div className="flex gap-1.5 flex-wrap">
          {Array(5)
            .fill(null)
            .map((_, index) => {
              return (
                <label
                  key={index}
                  htmlFor={`productImage_${index}`}
                  className="px-10 py-4 bg-gray-200 flex flex-col items-center  cursor-pointer text-gray-400 rounded-lg"
                >
                  {files[index] && <span>{files[index].name}</span>}
                  <UploadCloud size={20} strokeWidth={2} />
                  <input
                    hidden
                    disabled={loading}
                    onChange={(e) => {
                      setFiles((prev) => {
                        const newFile = [...prev];
                        newFile[index] = e.target.files[0];
                        return newFile;
                      });
                    }}
                    name={`product_name${index}`}
                    accept="img/png, img/jpeg"
                    type="file"
                    id={`productImage_${index}`}
                  />
                </label>
              );
            })}
        </div>
        <div className="flex flex-col gap-2 text-gray-500 sm:max-w-1/4">
          <label htmlFor="productName">Name</label>
          <input
            type="text"
            value={productName}
            required
            onChange={(e) => setProductName(e.target.value)}
            id="productName"
            placeholder="Enter product name"
            className="border border-gray-200  p-3  rounded-sm outline-0 pl-4 text-sm text-gray-500"
          />
        </div>
        <div className="flex flex-col gap-2 text-gray-500 sm:max-w-1/4">
          <label htmlFor="productDescription">Description</label>
          <textarea
            type="text"
            value={productDescription}
            required
            onChange={(e) => setProductDescription(e.target.value)}
            id="productDescription"
            placeholder="Enter product description"
            rows={8}
            className="border border-gray-200  p-3  rounded-sm resize-none outline-0 pl-4 text-sm text-gray-500"
          />
        </div>
        <div className="flex flex-wrap  gap-4 text-gray-500 sm:max-w-1/4">
          <div className="flex flex-col gap-2">
            <span>Actual Price ($)</span>
            <input
              type="number"
              value={actualPrice}
              required
              onChange={(e) => setActualPrice(e.target.value)}
              max={100000}
              min={0}
              className="border border-gray-200  p-3  rounded-sm outline-0 pl-4 text-sm text-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <span>Offer Price ($)</span>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
              max={100000}
              min={0}
              className="border border-gray-200  p-3  rounded-sm outline-0 pl-4 text-sm text-gray-500"
            />
          </div>
        </div>
        <select
          value={categoryId}
          required
          onChange={(e) => setCategoryID(e.target.value)}
          className="sm:max-w-1/4 outline-0 border border-slate-300 rounded-sm text-gray-500  py-2 pl-2"
          id="categorySelection w-1/4"
        >
          <option value="">Select a category</option>
          {categories.length > 0 &&
            categories.map((i) => {
              return <option value={i.id}>{i.name}</option>;
            })}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 text-white sm:max-w-1/4 cursor-pointer text-center py-2 bg-slate-800 rounded-sm transform transition-all hover:bg-slate-900  active:scale-95"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
