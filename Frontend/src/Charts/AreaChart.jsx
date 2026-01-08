import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ values }) => {
  const [state] = React.useState({
    series: [
      {
        name: "Orders",
        data: values?.map((i) => i.orders),
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      title: {
        text: "Orders/Day",
        style: { color: "#333", fontSize: "18px", fontWeight: "12px" },
        align: "left",
      },

      labels: values?.map((i) => i.date),
      xaxis: {
        title: {
          text: "Date",
          style: { color: "#333", fontSize: "14px", fontWeight: "12px" },
        },
        type: "category",
      },
      yaxis: {
        title: {
          text: "Orders",
          style: { color: "#333", fontSize: "14px", fontWeight: "12px" },
        },
        opposite: false,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default AreaChart;
