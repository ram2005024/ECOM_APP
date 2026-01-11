import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { findAverageRating } from "../utils/findAverageRating.js";
import {
  Globe,
  IdCard,
  Minus,
  MoveRight,
  Plus,
  Star,
  Tag,
  User,
} from "lucide-react";
import axios from "axios";
import { addCart } from "../slices/cartSlice.jsx";

const ProductView = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [selectedImage, setSelected] = useState();
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(null);
  const [pReview, setPReview] = useState([]);
  const [activeLink, setActiveLink] = useState("description");
  useEffect(() => {
    const getProduct = async () => {
      if (products.length > 0) {
        const found = products.find((i) => i.id == pid);
        setProduct(found);
        setSelected(found.image[0]);
      }
    };
    getProduct();
  }, [products, pid]);
  const currentCartItem = product
    ? items.find((i) => i.productId === product.id)
    : null;
  const quantity = currentCartItem ? currentCartItem.quantity : 0;
  const imageURL = (i) => {
    if (i?.startsWith("http")) {
      return i;
    } else {
      return `${import.meta.env.VITE_SERVER_URL}${i}`;
    }
  };
  useEffect(() => {
    if (product?.reviews) {
      const ratingArray = product?.reviews.map((i) => i.rating);
      (async () => {
        const rating = await findAverageRating(ratingArray);
        setRating(rating);
        setPReview(product.reviews);
      })();
    } else {
      setRating(null);
    }
  }, [product, products]);
  const handleAddCart = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/cart/addCart",
        {
          pid: product.id,
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
  const handleIncreaseCart = async () => {
    try {
      const cartItemId = items.find(
        (i) => product.id === i.productId
      ).cartItemId;
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/cart/increaseQuantity",
        {
          cartItemId,
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
  const handleDecreaseCart = async () => {
    try {
      const cartItemId = items.find(
        (i) => product.id === i.productId
      ).cartItemId;
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/cart/decreaseQuantity",
        {
          cartItemId,
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
  return (
    <div className="min-h-screen min-w-screen">
      <div className="mt-10 flex flex-col gap-3 w-10/12 m-auto">
        <span className="text-sm text-gray-700">
          Home/Product/{product?.category.name}
        </span>
        <div className="flex size-full flex-wrap sm:mt-8  gap-1.5">
          <div className="flex flex-col  sm:w-1/12 w-4/12  items-center  gap-2">
            {product?.image?.map((i, index) => {
              const image = imageURL(i);

              return (
                <img
                  key={index}
                  src={image}
                  alt="product_image"
                  onClick={() => setSelected(i)}
                  className="sm:w-10/12 sm:h-3/12 size-8 transition transform hover:scale-105 cursor-pointer border border-gray-200 rounded-md"
                />
              );
            })}
          </div>
          <div className="w-1/3  mr-7  border flex items-center justify-center border-gray-100 bg-gray-200 rounded-md">
            <img
              src={imageURL(selectedImage)}
              className="sm:size-70  size-full"
              alt="product_image"
            />
          </div>
          <div className="flex flex-col gap-3.5">
            <h2 className="sm:text-3xl text-sm font-semibold">
              {product?.name}
            </h2>
            {rating ? (
              <div className="flex gap-3 items-center">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => {
                      return (
                        <Star
                          id={i}
                          key={i}
                          size={12}
                          className={
                            i < rating
                              ? "fill-green-500 text-green-500"
                              : "fill-gray-400 text-gray-400"
                          }
                        />
                      );
                    })}
                </div>
                <span className="text-gray-700 text-sm">
                  {product.reviews.length} Reviews
                </span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">No rating yet</span>
            )}

            {product && product?.offerPrice != 0 ? (
              <div className="flex gap-3 mt-4">
                <span className="text-2xl font-semibold">
                  $ {product.price - product.offerPrice}
                </span>
                <span className="line-through text-xl font-semibold text-gray-600">
                  {product?.price}
                </span>
              </div>
            ) : (
              <span className=" text-xl font-semibold text-gray-800 ">
                ${product?.price}
              </span>
            )}
            <div className="flex gap-2.5 items-center text-gray-600">
              {product?.offerPrice != 0 ? (
                <>
                  <Tag size={15} />
                  <span>
                    Save{" "}
                    {Math.floor(
                      ((product?.price -
                        (product?.price - product?.offerPrice)) *
                        100) /
                        product?.price
                    )}
                    % right now
                  </span>
                </>
              ) : (
                <span> {}</span>
              )}
            </div>
            <div className="mt-5">
              {!currentCartItem ? (
                <button
                  onClick={() => handleAddCart()}
                  className="py-3 px-10 cursor-pointer bg-zinc-800 rounded-sm text-sm text-white "
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex gap-3 items-end">
                  <div className="flex flex-col gap-2.5 ">
                    <span>Quantity</span>
                    <div className="flex py-1 border w-full  border-gray-200 justify-between px-2 rounded-sm">
                      <button
                        onClick={() => handleDecreaseCart()}
                        className="inline-flex  cursor-pointer items-center justify-center"
                      >
                        <Minus size={8} className="text-gray-600" />
                      </button>
                      <span className="text-gray-700">{quantity}</span>
                      <button
                        onClick={() => handleIncreaseCart()}
                        className="inline-flex cursor-pointer items-center justify-center"
                      >
                        <Plus size={8} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/cart")}
                    className="py-2 px-8 cursor-pointer bg-zinc-800 rounded-sm text-sm text-white "
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>
            <hr className="text-gray-200 mt-3" />
            <div className="flex flex-col gap-3 ">
              <div className="flex gap-2.5 text-gray-400 items-center">
                <Globe size={18} />
                <span>Free shipping available around the globe</span>
              </div>
              <div className="flex gap-2.5 text-gray-400 items-center">
                <IdCard size={18} />
                <span>Secure payment</span>
              </div>
              <div className="flex gap-2.5 text-gray-400 items-center">
                <User size={18} />
                <span>Trusted by top company</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:mt-15 sm:ml-15 p-0">
          <div className="border-b  border-gray-200 flex text-sm text-gray-700">
            <span
              onClick={() => setActiveLink("description")}
              className={`px-4   cursor-pointer ${
                activeLink === "description"
                  ? "border-b-2  border-b-gray-500 -mb-px   "
                  : ""
              }`}
            >
              Description
            </span>
            <span
              onClick={() => setActiveLink("review")}
              className={`px-4  cursor-pointer ${
                activeLink === "review"
                  ? "border-b-2  border-b-gray-500 -mb-px  "
                  : ""
              }`}
            >
              Reviews
            </span>
          </div>
          {activeLink === "description" ? (
            <div className=" text-sm  mt-5 text-gray-500 w-md ">
              <p className="px-2">{product?.description}</p>
            </div>
          ) : (
            <div className="text-sm  mt-5 text-gray-500 w-md space-y-3">
              {pReview && pReview.length > 0 ? (
                pReview.map((i) => {
                  const rating = i.rating;
                  const comment = i.comment;
                  return (
                    <div className="flex gap-3">
                      {/* User image */}
                      {i.user.image && (
                        <img
                          src={i.user.image}
                          alt="_userImage"
                          className="size-18 rounded-full "
                        />
                      )}
                      <div>
                        <User
                          size={30}
                          strokeWidth={1}
                          className="bg-slate-800 rounded-full text-white fill-white"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1 ">
                          {Array.from({ length: 5 }).map((_, inx) => (
                            <Star
                              key={inx}
                              className={`size-3 ${
                                rating > inx
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 fill-gray-300 "
                              }`}
                            />
                          ))}
                        </div>
                        <div>
                          {!comment && <span>No comment</span>}
                          <p>{comment}</p>
                        </div>
                        <span className="font-semibold">{i.user.name}</span>
                        <span className="text-xs">
                          {new Date(i.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span className="mt-5 text-gray-600 text-sm">
                  No reviews yet
                </span>
              )}
            </div>
          )}
        </div>
        {/* Product by section */}
        {product && (
          <div className="sm:mt-10 sm:ml-15">
            <div className="flex  items-center">
              <img
                src={imageURL(product.seller.image)}
                alt="_seller_image"
                className="size-20 rounded-full bg-white border-gray-100"
              />

              <div className="text-sm">
                <span className="text-gray-500 font-semibold">
                  Product by {product.seller.storename}
                </span>
                <div className="flex gap-2 items-center text-sm text-gray-500">
                  <Link to={`/shop/${product.seller.id}`}>view store</Link>
                  <MoveRight size={12} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;
