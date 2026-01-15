import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Seller from "./Pages/Seller";
import Admin from "./Pages/Admin";
import ProductView from "./Pages/ProductView";
import MainLayout from "../Layouts/MainLayout";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
import Orders from "./Pages/Orders";
import ViewShop from "./Pages/Shop_Dynamic/ViewShop";
import ContactAdmin from "./Pages/Contacts/ContactAdmin";
import PlusMember from "./Pages/Membership/PlusMember";
import BecomeASeller from "./Pages/Membership/SellerSubscription";
import Protected from "./middlewares/Protected";
import ProtectSeller from "./middlewares/ProtectSeller";
import ProtectContactAdmin from "./middlewares/ContactAdmin";
import ProtectAdmin from "./middlewares/ProtectAdmin";

import { login, setSubscription } from "./slices/authSlice";
import { createSeller } from "./slices/sellerSlice";
import { addCart } from "./slices/cartSlice";
import ContactPage from "./Pages/Contact";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/contact/admin",
        element: (
          <ProtectContactAdmin>
            <ContactAdmin />
          </ProtectContactAdmin>
        ),
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      { path: "/seller/subscription", element: <BecomeASeller /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:shopId", element: <ViewShop /> },
      {
        path: "/product/:pid",
        element: (
          <Protected>
            <ProductView />
          </Protected>
        ),
      },
      {
        path: "/cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "/orders",
        element: (
          <Protected>
            <Orders />
          </Protected>
        ),
      },
    ],
  },
  { path: "/success", element: <Success /> },

  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <Protected>
            <ProtectAdmin>
              <Admin />
            </ProtectAdmin>
          </Protected>
        ),
      },
      {
        path: "/store",
        element: (
          <Protected>
            <ProtectSeller>
              <Seller />
            </ProtectSeller>
          </Protected>
        ),
      },
    ],
  },
  { path: "/plus", element: <PlusMember /> },
]);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const fetchUserData = async () => {
    try {
      // 1️ Get user
      const userRes = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/auth/user/me",
        { withCredentials: true }
      );
      if (!userRes.data.success) throw new Error(userRes.data.message);
      const user = userRes.data.user;
      dispatch(login(user));

      // 2️ Get subscription
      const subRes = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/auth/user/getSubscription",
        { withCredentials: true }
      );
      const subscription = subRes.data.success
        ? subRes.data.subscription
        : null;
      if (subscription) dispatch(setSubscription(subscription));

      // 3️ Check subscription
      if (subscription && user.role === "customer") {
        const endTrial = new Date(subscription.trialEnd);
        if (new Date() > endTrial) {
          await axios.get(
            import.meta.env.VITE_SERVER_URL + "/auth/user/plusDisable",
            { withCredentials: true }
          );
        }
      }

      if (subscription && user.role === "seller") {
        const endTrial = new Date(subscription.trialEnd);
        if (new Date() > endTrial) {
          await axios.get(
            import.meta.env.VITE_SERVER_URL + "/store/disable/seller",
            { withCredentials: true }
          );
        }
      }

      // 4️ If seller, get seller info
      if (user.role === "seller") {
        const sellerRes = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/store/get",
          {},
          { withCredentials: true }
        );
        if (sellerRes.data.success) {
          dispatch(createSeller(sellerRes.data.seller));
        } else {
          toast.error(sellerRes.data.message);
        }
      }

      // 5️ Get cart
      const cartRes = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/cart/getCartDetail",
        { withCredentials: true }
      );
      if (cartRes.data.success) dispatch(addCart(cartRes.data.response));
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  console.log("Bro", user);
  return <RouterProvider router={router} />;
};

export default App;
