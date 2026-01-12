import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createSeller } from "../slices/sellerSlice";
const ProtectSeller = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { seller, loading } = useSelector((state) => state.seller);
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const seller = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/store/get",
          {},
          {
            withCredentials: true,
          }
        );
        if (seller.data.success) {
          dispatch(createSeller(seller.data.seller));
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeller();
  }, [user?.role, dispatch]);

  if (user?.role !== "seller") return <Navigate to="/" replace />;
  if (loading) return <div>loading seller.....</div>;

  if (seller && seller?.isActive) return children;
  else {
    return <Navigate to="/contact/admin" />;
  }
};

export default ProtectSeller;
