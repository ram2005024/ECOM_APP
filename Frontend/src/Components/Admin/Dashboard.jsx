import React from "react";
import AreaChart from "../../Charts/AreaChart";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import LoadingSmallDiv from "../Loading/LoadingSmallDiv";
const Dashboard = () => {
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/order/getAllOrdersAndDate"
        );
        if (res.data.success) {
          setLoading(false);
          setValues(res.data.value);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(values);
  if (loading) {
    return (
      <div className="size-full flex items-center justify-center">
        <LoadingSmallDiv />
      </div>
    );
  }
  console.log(values);
  return (
    <div>
      <AreaChart values={values} />
    </div>
  );
};

export default Dashboard;
