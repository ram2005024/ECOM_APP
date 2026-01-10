import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectSeller = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const { seller, loading } = useSelector((state) => state.seller);
  console.log(seller);
  //Check the role
  if (user?.role === "customer" || user?.role === "admin") {
    return <Navigate to="/" replace />;
  }
  if (loading) return <div>loading seller.....</div>;
  if (!seller) return <Navigate to="/" replace />;
  if (seller?.isActive) return children;
  else {
    return <Navigate to="/contact/admin" />;
  }
};

export default ProtectSeller;
