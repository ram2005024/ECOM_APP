import { MessageCircle, Redo2, Timer } from "lucide-react";
import React from "react";

const Specification = () => {
  const specification = [
    {
      spec: "Free Shipping",
      desc: "Enjoy fast and free shipping on exclusive membership",
      bgColor: "#F3F4F6",
      logo: <MessageCircle className="size-6 text-white" strokeWidth={1.5} />,
      logoColor: "orange",
    },
    {
      spec: "24/7 Support",
      desc: "Get round-the-clock customer support whenever you need help",
      bgColor: "#E0F2FE",
      logo: <Timer className="size-6 text-white" strokeWidth={1.5} />,
      logoColor: "blue",
    },
    {
      spec: "Easy Returns",
      desc: "Hassle-free returns within 30 days of purchase",
      bgColor: "#ECFDF5",
      logo: <Redo2 className="size-6 text-white" strokeWidth={1.5} />,
      logoColor: "green",
    },
  ];

  return (
    <div className="mb-40">
      <div className="w-10/12 mx-auto flex flex-col items-center ">
        <h2 className="text-xl font-semibold mb-3">Our specification</h2>
        <p className="text-gray-600 font-sm text-sm  max-w-lg text-center mb-20">
          We offer top-tier service and convenience to ensure your shopping
          experience is smooth, secure and completely hassle-free.
        </p>
        <div className="flex gap-8 mb-20 flex-wrap">
          {specification.map((item) => {
            return (
              <div
                style={{
                  backgroundColor: item.bgColor,
                }}
                className="rounded-lg relative group p-12 flex flex-col gap-3 text-center"
              >
                <span className=" font-bold">{item.spec}</span>
                <span className="text-gray-600 text-sm max-w-60">
                  {item.desc}
                </span>
                <span
                  className="absolute -top-3.5 left-36 p-1.5 rounded-lg transform transition-all group-hover:scale-105"
                  style={{
                    backgroundColor: item.logoColor,
                  }}
                >
                  {item.logo}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Specification;
