import axios from "axios";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingScreen from "../Loading/AdminLoading";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(
        axios.post(
          import.meta.env.VITE_SERVER_URL + "/admin/addCategory",
          {
            category,
          },
          {
            withCredentials: true,
          }
        ),
        {
          loading: "Adding Category",
          error: "Error occured",
          success: "Added Category",
        }
      );
      if (res.data.success) {
        setCategories((prev) => [...prev, res.data.cat]);
        setCategory("");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/admin/getCategory",
          {
            withCredentials: true,
          }
        );
        console.log(res.data.categories);
        if (!res.data.success) {
          setCategories(null);
          toast.error(res.data.message);
          return;
        }
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCategory();
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col">
      <form
        onSubmit={(e) => handleAddCategory(e)}
        className="flex flex-col gap-3 ml-8 px-6 p-2 mt-10 w-1/3 rounded-lg border border-gray-200"
      >
        <h2 className="text-xl text-center font-semibold">Add Category</h2>
        <input
          type="text"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter a category name"
          className="p-2 rounded-lg outline-none border border-gray-200 text-sm text-gray-500 pl-8"
        />
        <button
          type="submit"
          className="text-sm mb-3 bg-indigo-500 text-white rounded-sm p-2 w-full rounde-sm text-center transform transition-all hover:scale-105 active:scale-100 cursor-pointer"
        >
          Submit Category
        </button>
      </form>
      {categories.length > 0 ? (
        <div className="flex flex-col  gap-3 ml-8 px-6 p-2 mt-10 w-5/12 rounded-lg border border-gray-200">
          <div className="flex w-full justify-between font-bold">
            <span>Name</span>
            <span>Id</span>
          </div>
          {categories.map((i) => {
            return (
              <div key={i.id} className="flex w-full justify-between">
                <span>{i.name}</span>
                <span>{i.id}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2 self-center mt-20 items-center">
          <Plus size={50} className="text-gray-500 bg-gray-300 rounded-lg" />
          <span className="text-xl text-gray-500"> No categories to show</span>
          <span className="text-xl text-gray-500">
            Add categories above to get started
          </span>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
