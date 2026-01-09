import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user == null) return <div>loading seller.....</div>;

  //Check if the seller is active or not
  if (user?.role === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectAdmin;
