import axios from "axios";
import {
  Minus,
  MoveRight,
  NotebookPen,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, setAddressFilled } from "../slices/cartSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import AddressForm from "../Components/Cart/AddressForm";
import CoupenSection from "../Components/Cart/CoupenSection";
const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { address, addressFilled } = useSelector((state) => state.cart);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [coupenDetail, setCoupenDetail] = useState(null);
  const handleSubmitFromChild = (value) => {
    setCoupenDetail(value);
  };
  const dispatch = useDispatch();
  const imageURL = (i) => {
    if (i?.startsWith("http")) {
      return i;
    } else {
      return `${import.meta.env.VITE_SERVER_URL}${i}`;
    }
  };
  const handleIncreaseCart = async (id) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/cart/increaseQuantity",
        {
          cartItemId: id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(addCart(res.data.response));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecreaseCart = async (id) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/cart/decreaseQuantity",
        {
          cartItemId: id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(addCart(res.data.response));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCartItem = async (id) => {
    try {
      const res = await axios.delete(
        import.meta.env.VITE_SERVER_URL + "/cart/delete",
        {
          data: {
            cartItemId: id,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(addCart(res.data.response));
        toast.success(res.data.message);
        return;
      }
      toast.error(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  if (items?.length === 0) {
    return (
      <div className=" h-screen w-full flex flex-col gap-2 items-center justify-center">
        <Plus size={30} className="text-gray-700 bg-gray-100 rounded-md " />
        <h2 className="text-2xl font-semibold text-gray-700">
          No items in the cart
        </h2>
        <span className="text-gray-500">Please add items</span>
      </div>
    );
  }
  console.log("From parent", coupenDetail);
  const handlePaymentSubmit = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please fill the address field");
        return;
      }
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/cart/payment/stripe-session",
        {
          items,
          coupenDetail,
          selectedAddress,
        },
        {
          withCredentials: true,
        }
      );
      if (!res.data.success) return toast.error(res.data.message);
      window.location.href = res.data.url;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen">
      <div className="w-10/12 m-auto">
        <div className="flex flex-col gap-2 mt-6">
          <h2 className="text-2xl font-semibold">My Carts</h2>
          <div className="flex gap-2.5">
            <span className="text-gray-600">items in your cart</span>
            <div className="flex gap-2 text-sm text-gray-400 items-center">
              <Link to="/shop">Add more</Link>
              <MoveRight size={12} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">
            <div>
              <table className="border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="pr-80">Product</th>
                    <th className="pr-20">Quantity</th>
                    <th className="pr-20">Total Price</th>
                    <th className="pr-20">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    [...items]
                      .sort((a, b) => a.price - b.price)
                      .map((i) => {
                        return (
                          <tr key={i.cartItemId}>
                            <td className="pt-4">
                              <div className="flex gap-2.5">
                                <img
                                  src={imageURL(i.image[0])}
                                  alt="product_image"
                                  className="size-18 p-3 bg-gray-100 rounded-md"
                                />
                                <div className="flex flex-col ">
                                  <span className="text-gray-700">
                                    {i.name}
                                  </span>
                                  <span className="text-gray-500 text-sm">
                                    {i.category.name}
                                  </span>
                                  <span className="font-bold text-gray-600">
                                    $ {i.price}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className=" text-start">
                              <div className="flex py-1 border w-fit  border-gray-200 justify-between px-2 rounded-sm">
                                <button
                                  onClick={() =>
                                    handleDecreaseCart(i.cartItemId)
                                  }
                                  className="inline-flex  cursor-pointer items-center justify-center"
                                >
                                  <Minus size={8} className="text-gray-600" />
                                </button>
                                <input
                                  type="number"
                                  min={1}
                                  readOnly
                                  className="w-10 outline-none text-center"
                                  value={i.quantity}
                                />
                                <button
                                  onClick={() =>
                                    handleIncreaseCart(i.cartItemId)
                                  }
                                  className="inline-flex cursor-pointer items-center justify-center"
                                >
                                  <Plus size={8} className="text-gray-600" />
                                </button>
                              </div>
                            </td>
                            <td className=" text-start">$ {i.subTotal}</td>
                            <td className=" text-center">
                              <Trash2
                                size={18}
                                onClick={() =>
                                  handleDeleteCartItem(i.cartItemId)
                                }
                                className="text-red-500 cursor-pointer"
                              />
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>

            {/* Move payment section here */}
            <div className="flex flex-col  py-6 px-5 h-fit text-gray-500 border border-gray-300 rounded-lg bg-slate-50">
              <h2 className="text-gray-600 text-2xl mb-3">Payment Summary</h2>
              <span className="text-sm mb-2">Payment method</span>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1.5 text-sm">
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      value="cod"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    COD
                  </label>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      value="stripe"
                      name="paymentMethod"
                      checked={paymentMethod === "stripe"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="bg-black"
                    />
                    Stripe
                  </label>
                </div>
                <hr className="text-gray-200 w-11/12 self-center text-sm" />
                <div className="flex flex-col gap-2.5 text-sm">
                  <span>Address</span>
                  {address.length !== 0 && !isAddressSelected && (
                    <select
                      onChange={(e) => {
                        const index = parseInt(e.target.value);
                        if (index === -1) {
                          setSelectedAddress(null);
                          setIsAddressSelected(false);
                        } else {
                          setSelectedAddress(address[index]);
                          console.log(selectedAddress);
                          setIsAddressSelected(true);
                        }
                      }}
                    >
                      <option value={-1}>Select an address</option>
                      {address.map((i, index) => {
                        return (
                          <option key={index} value={index}>
                            {i.userName},{i.city},{i.state},{i.zip}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {isAddressSelected && (
                    <div className="flex w-full gap-8 items-center">
                      <span>
                        {selectedAddress.userName},{selectedAddress.city},
                        {selectedAddress.street},{selectedAddress.zip}
                      </span>
                      <NotebookPen
                        size={13}
                        onClick={() => dispatch(setAddressFilled())}
                        className="cursor-pointer text-gray-700"
                      />
                    </div>
                  )}
                  <div
                    onClick={() => {
                      dispatch(setAddressFilled());
                      setSelectedAddress(null);
                      setIsAddressSelected(false);
                    }}
                    className="flex gap-1.5 cursor-pointer items-center text-sm"
                  >
                    <span>Add address</span>
                    <Plus size={14} strokeWidth={4} />
                  </div>
                </div>
                <hr className="text-gray-200 w-11/12 self-center text-sm" />
                <div>
                  <CoupenSection onSubmit={handleSubmitFromChild} />
                </div>
                <button
                  onClick={handlePaymentSubmit}
                  className="py-3 mt-8 rounded-sm text-sm cursor-pointer text-center bg-slate-800 text-white font-semibold"
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addressFilled && (
        <AddressForm
          onEdit={(finalAddress) => setSelectedAddress(finalAddress)}
          addresses={selectedAddress}
        />
      )}
    </div>
  );
};

export default Cart;
