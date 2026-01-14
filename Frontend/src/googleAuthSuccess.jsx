import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // hit backend to confirm login via cookie
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/auth/user/me", {
        withCredentials: true, // MUST be true
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(login(res.data.user));
          navigate("/"); // go to homepage or previous page
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"));
  }, []);

  return <div>Logging in...</div>;
};

export default GoogleSuccess;
