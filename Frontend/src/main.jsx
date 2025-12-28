import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { store } from "./store/Store.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={true} />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
