import axios from "axios";
import { useEffect } from "react";

const Orders = () => {
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get;
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  });
  return <div>Hello order</div>;
};

export default Orders;
