import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Components/SignIn/Login";
import LoadingScreen from "../Components/Loading";
import axios from "axios";
import { authFinished, login, setAuthenticated } from "../slices/authSlice";

const Protected = ({ children }) => {
  const dispatch = useDispatch();

  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/auth/user/me",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(login(res.data.user));
        } else {
          dispatch(authFinished());
          dispatch(setAuthenticated(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(authFinished());
        dispatch(setAuthenticated(false));
      }
    };
    checkAuthentication();
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return isAuthenticated ? children : <Login />;
};

export default Protected;
