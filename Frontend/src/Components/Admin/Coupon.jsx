import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Coupon = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [maxCartValue, setMaxCartValue] = useState(1);
  const [description, setDescription] = useState("");
  const [expDate, setExpDate] = useState("");
  const [forMember, setForMember] = useState(false);
  const [forNew, setForNew] = useState(false);
  const [discountType, setDiscountType] = useState("");
  const [maxDiscountValue, setMaxDiscountValue] = useState(1);
  const [coupens, setCoupens] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      code,
      discount,
      maxCartValue,
      description,
      expDate,
      forMember,
      forNew,
      discountType,
      maxDiscountValue,
    };
    try {
      const res = await toast.promise(
        axios.post(
          import.meta.env.VITE_SERVER_URL + "/admin/addCoupens",

          data,

          {
            withCredentials: true,
          }
        ),
        {
          loading: "Adding coupen...",
          success: (res) => res.data.message,
          error: (err) => err.response?.data?.message || err.message,
        }
      );
      setCoupens((prev) => [...prev, res.data.coupens]);

      setCode("");
      setDiscount(0);
      setMaxCartValue(0);
      setDescription("");
      setExpDate("");
      setForMember(false);
      setForNew(false);
      setDiscountType("");
      setMaxDiscountValue(0);
      return;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getCoupensList = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/admin/getCoupens",
          {
            withCredentials: true,
          }
        );
        setCoupens(res.data.coupens);
      } catch (error) {
        console.log(error);
      }
    };
    getCoupensList();
  }, []);
  const handleActive = async (value, id) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/admin/changeActive",
        { value, id },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(value ? "Activated" : "Deactivated");
        setCoupens((prev) =>
          prev.map((i) => (i.id == id ? res.data.coupen : i))
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-col mt-8 ml-12">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">
          Add <span className="text-black">Coupens</span>
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-3 w-6/12"
        >
          <div className="flex gap-1.5 ">
            <input
              type="text"
              placeholder="Coupen code"
              value={code}
              required
              onChange={(e) => setCode(e.target.value)}
              className="text-sm border border-gray-300  py-2 pl-2 text-gray-400 rounded-md outline-none"
            />
            <input
              type="number"
              min={1}
              placeholder="Coupen discount"
              value={discount}
              required
              onChange={(e) => setDiscount(e.target.value)}
              className="text-sm border border-gray-300  py-2 pl-2  text-gray-400 rounded-md outline-none"
            />
          </div>
          <select
            required
            value={discountType}
            className="text-sm border border-gray-300  py-2 pl-2  text-gray-400 rounded-md outline-none"
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="">Select discount type</option>
            <option value="percentage">Percentage</option>
            <option value="number">Value</option>
          </select>
          <input
            type="text"
            placeholder="Coupen description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-sm border border-gray-300 py-2 pl-2  text-gray-400 rounded-md outline-none"
          />
          <div className="flex gap-2.5">
            <input
              type="number"
              placeholder="Max Cart value"
              required
              min={0}
              value={maxCartValue}
              onChange={(e) => setMaxCartValue(e.target.value)}
              className="text-sm border border-gray-300  py-2 pl-2  text-gray-400 rounded-md outline-none"
            />
            <input
              type="number"
              required
              min={0}
              placeholder="Max discount value"
              value={maxDiscountValue}
              onChange={(e) => setMaxDiscountValue(e.target.value)}
              className="text-sm border border-gray-300  py-2 pl-2  text-gray-400 rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="expDate">Expiry Date</label>
            <input
              type="date"
              required
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
              className="w-full border  border-gray-300   text-sm py-2 pl-2  text-gray-400 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 mt-3 ">
            <div className="flex gap-2 items-center">
              <label className="group cursor-pointer">
                <input
                  type="checkbox"
                  checked={forNew}
                  onChange={(e) => setForNew(e.target.checked)}
                  className="peer hidden"
                />
                <div className="w-11 h-6 flex items-center pl-1 bg-gray-400 transition-colors group-has-[input:checked]:bg-green-500 rounded-full relative ">
                  <div className="size-4 rounded-full bg-white  transition-transform group-has-[input:checked]:translate-x-4"></div>
                </div>
              </label>
              <span className="text-sm text-gray-700">For New User</span>
            </div>
            <div className="flex gap-2">
              <label className="group cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={forMember}
                  onChange={(e) => setForMember(e.target.checked)}
                />
                <div className="w-11 h-6 flex items-center pl-1 bg-gray-400 transition-colors group-has-[input:checked]:bg-green-500 rounded-full relative ">
                  <div className="size-4 rounded-full bg-white  transition-transform group-has-[input:checked]:translate-x-4"></div>
                </div>
              </label>
              <span className="text-sm text-gray-700">For Member</span>
            </div>
          </div>
          <button
            type="submit"
            className="py-2 mt-6 flex items-center w-1/5 cursor-pointer text-sm justify-center bg-slate-800 text-white transition-transform transform active:scale-95 rounded-md "
          >
            Add Coupen
          </button>
        </form>
      </div>
      <div className="mt-20 ml-12">
        {coupens.length > 0 ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-gray-500">
              List <span className=" text-black">Coupens</span>
            </h2>
            <div className="border border-gray-200 rounded-t-lg overflow-hidden w-10/12">
              <table className="border border-collapse  w-full">
                <thead className="bg-gray-200 text-sm">
                  <tr className="p-2">
                    <td className="py-2 px-4">Code</td>
                    <td className="py-2 px-4">Description</td>
                    <td className="py-2 px-4">Discount Type</td>
                    <td className="py-2 px-4">Discount</td>
                    <td className="py-2 px-4">Max Cart Value</td>
                    <td className="py-2 px-4">Expires at</td>
                    <td className="py-2 px-4">New User</td>
                    <td className="py-2 px-4">New Member</td>
                    <td className="py-2 px-4">Active</td>
                  </tr>
                </thead>
                <tbody className="p-2">
                  {coupens &&
                    [...coupens]
                      .sort((a, b) => a.id - b.id)
                      .map((i) => {
                        return (
                          <tr
                            key={i.id}
                            className="text-gray-700 text-xs border border-gray-100 "
                          >
                            <td className="py-2 px-5 font-bold">{i.code}</td>
                            <td className="py-2 px-5 ">{i.description}</td>
                            <td className="py-2 px-5 ">{i.discountType}</td>
                            <td className="py-2 px-5 ">{i.discountValue}</td>
                            <td className="py-2 px-5 ">{i.maxCartValue}</td>
                            <td className="py-2 px-5 ">
                              {new Date(i.expiresAt).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-5 ">
                              {i.forNewUser ? "Yes" : "No"}
                            </td>
                            <td className="py-2 px-5 ">
                              {i.forPlus ? "Yes" : "No"}
                            </td>
                            <td className="py-2 px-5 ">
                              <label
                                className={`w-9 h-5 cursor-pointer pl-1 rounded-full flex items-center  transition-colors ${
                                  i.isActive ? "bg-green-600" : "bg-gray-400"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  hidden
                                  checked={i.isActive}
                                  onChange={(e) =>
                                    handleActive(e.target.checked, i.id)
                                  }
                                />
                                <div
                                  className={`size-4 rounded-full bg-white transition-transform ${
                                    i.isActive
                                      ? "translate-x-3"
                                      : "translate-x-0"
                                  }`}
                                ></div>
                              </label>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="size-full flex items-center">
            <h2>No coupens made</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupon;
