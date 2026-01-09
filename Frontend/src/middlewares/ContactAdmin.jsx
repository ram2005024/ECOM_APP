import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectContactAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const { seller, loading } = useSelector((state) => state.seller);

  if (loading) {
    return <div>Loading seller…</div>;
  }

  if (user?.role === "customer" || user?.role === "admin") {
    return <Navigate to="/" replace />;
  }

  if (seller?.isActive) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectContactAdmin;
