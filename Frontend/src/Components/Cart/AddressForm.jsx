import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress, setAddressFilled } from "../../slices/cartSlice";

const AddressForm = ({ addresses, onEdit }) => {
  const [userName, setName] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const finalAddress = {
      userName,
      address,
      street,
      city,
      state,
      zip,
      country,
      phone,
    };
    dispatch(addAddress(finalAddress));
    dispatch(setAddressFilled());
    onEdit && onEdit(finalAddress);
  };
  useEffect(() => {
    if (addresses) {
      setName(addresses?.userName || "");
      setAddress(addresses?.address || "");
      setStreet(addresses?.street || "");
      setCity(addresses?.city || "");
      setState(addresses?.state || "");
      setZip(addresses?.zip || "");
      setCountry(addresses?.country || "");
      setPhone(addresses?.phone || "");
    } else {
      setName("");
      setAddress("");
      setStreet("");
      setCity("");
      setState("");
      setZip("");
      setCountry("");
      setPhone("");
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleFormSubmit}
        className="w-1/3 p-3 pl-6 flex flex-col relative gap-3.5 rounded-lg bg-white z-50"
      >
        <h2 className="text-2xl font-semibold text-gray-600">
          Add New <span className="text-black">Address</span>
        </h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
          className="text-sm text-gray-500 rounded-md pl-4 py-2 outline-none border border-gray-300"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="Enter your address"
          className="text-sm text-gray-500 rounded-md pl-4 py-2 outline-none border border-gray-300"
        />
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
          placeholder="Street"
          className="text-sm text-gray-500 rounded-md pl-4 py-2 outline-none border border-gray-300"
        />
        <div className="flex justify-between">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="City"
            className="text-sm text-gray-500 rounded-md pl-4 py-2 outline-none border border-gray-300"
          />
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder="State"
            className="text-sm text-gray-500 rounded-md pl-4 py-2 outline-none border border-gray-300"
          />
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
            placeholder="Zip Code"
            className="text-sm text-gray-500 rounded-md pl-4 py-2 outline-none border border-gray-300"
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Country"
            className="text-sm text-gray-500 rounded-md pl-4 py-2 outline-none border border-gray-300"
          />
        </div>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Phone"
          className="text-sm text-gray-500 rounded-md pl-4 py-2 outline-none border border-gray-300"
        />
        <button
          type="submit"
          className="py-2.5 text-center transition-transform transform active:scale-95 rounded-md text-white bg-slate-900 cursor-pointer  font-semibold"
        >
          Add address
        </button>
        <X
          onClick={() => dispatch(setAddressFilled())}
          className="absolute top-2 right-2 cursor-pointer hover:text-red-500 transition-colors size-6 "
        />
      </form>
    </div>
  );
};

export default AddressForm;
