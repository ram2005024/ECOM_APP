import axios from "axios";
import { Minus, MoveRight, Plus, Trash, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../slices/cartSlice";
import toast from "react-hot-toast";
const Cart = () => {
  const { items } = useSelector((state) => state.cart);
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
          <div className="w-full mt-6 flex flex-wrap">
            <table className="border-collapse">
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
                                <span className="text-gray-700">{i.name}</span>
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
                                onClick={() => handleDecreaseCart(i.cartItemId)}
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
                                onClick={() => handleIncreaseCart(i.cartItemId)}
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
                              onClick={() => handleDeleteCartItem(i.cartItemId)}
                              className="text-red-500 cursor-pointer"
                            />
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
