import axios from "axios";
import { Star, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProduct } from "../../slices/productSlice";
const RatingForm = ({
  ratingClicked,
  setIsRatingClicked,
  productId,
  setCurrentPId,
  existingRating = null,
  setCurrentProductRating,
}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (ratingClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    //Setting the modals from the existing rating
    if (existingRating) {
      setRating(existingRating.rating);
      setComment(existingRating.comment);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ratingClicked, existingRating]);
  const handleSubmitRating = async () => {
    try {
      let res;
      if (!existingRating) {
        res = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/product/addReview",
          {
            pId: productId,
            rating,
            comment,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) dispatch(setProduct(res.data.products));
      } else {
        res = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/product/updateReview",
          {
            reviewId: existingRating.id,
            rating,
            comment,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) dispatch(setProduct(res.data.products));
      }

      if (!res.data.success) {
        setMessage(res.data.message);
        return;
      }
      setIsRatingClicked((prev) => !prev);
      setCurrentProductRating(null);
      setCurrentPId(null);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setMessage("");
    }, 4000);
    return () => clearTimeout(timeOutId);
  }, [message]);
  return (
    <div
      onClick={() => {
        setIsRatingClicked((prev) => !prev);
        setCurrentProductRating(null);
        setCurrentPId(null);
      }}
      className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-sm p-4 rounded-lg relative flex flex-col gap-3 bg-white"
      >
        <X
          size={18}
          onClick={() => {
            setIsRatingClicked((prev) => !prev);
            setCurrentPId(null);
            setCurrentProductRating(null);
          }}
          className="absolute top-2 right-3 cursor-pointer text-gray-500 transition-colors hover:text-red-400"
        />
        <h2 className="text-2xl text-gray-600 font-semibold">Rate Product</h2>
        <div className="flex gap-1.5 justify-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`size-8 cursor-pointer transition-colors ${
                (hover || rating) >= value
                  ? "text-yellow-300 fill-yellow-300"
                  : "text-gray-400 fill-gray-400"
              }`}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              onClick={() => {
                setRating(value);
              }}
            />
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={7}
          className="resize-none ring rounded-sm ring-gray-200 outline-none  pl-5 py-4 transition-colors duration-150 focus:ring-indigo-400 text-gray-500 text-sm"
          type="text"
          placeholder="Enter your review (optional)"
        />
        {message && (
          <span className="text-red-500 transition-color">{message}</span>
        )}
        <button
          onClick={() => {
            handleSubmitRating();
          }}
          className="cursor-pointer bg-green-600 rounded-lg py-2 text-center text-white font-semibold mt-2"
        >
          {existingRating ? "Resubmit" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default RatingForm;
