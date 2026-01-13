import { ArrowRight, MoveRight } from "lucide-react";
import heroModel from "../../assets/hero_model_img.png";
import heroImage1 from "../../assets/c1.png";
import heroImage2 from "../../assets/g2.png";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div id="home">
      <div className="mt-10 grid w-full md:w-10/12 m-auto grid-cols-1 sm:grid-cols-8 grid-rows-[1fr_1fr] sm:gap-7 ">
        <div className="relative group col-span-5 row-span-2 p-12 rounded-lg bg-green-200">
          <div className="flex flex-col gap-4 ">
            <div className="bg-green-700/20 text-sm text-green-700   p-1 pr-5 flex items-center gap-3 rounded-full w-fit cursor-pointer">
              <span className="px-3 py-1.5 text-white text-center font-bold text-sm bg-green-700 rounded-3xl">
                News
              </span>
              <span>Free shipping for order above Rs100</span>
              <MoveRight
                size={12}
                className="group-hover:transform group-hover:ml-3 transition-all"
              />
            </div>
            <h2
              className="text-5xl font-semibold
             bg-gradient-to-r from-green-900 via-green-700  to-green-300 
             bg-clip-text text-transparent "
            >
              Items assures quality <br />
              No matter of prices
            </h2>
            <div className="flex flex-col mt-5">
              <span className="text-sm">Starts from</span>
              <span className="text-2xl font-semibold">Rs 100</span>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="px-2 sm:px-10 py-2 sm:py-5 bg-slate-800 cursor-pointer text-white text-sm w-fit rounded-lg transform transition-all duration-150 hover:scale-105 hover:bg-slate-900"
            >
              Learn more
            </button>
          </div>
          <img
            src={heroModel}
            alt="_heroImage"
            className="size-40 md:size-80 absolute bottom-0 right-0 sm:right-10"
          />
        </div>
        <div className="col-span-3  py-8 px-6 group flex items-center gap-15 bg-orange-200 rounded-lg sm:mr-20 m-0">
          <div>
            <h2 className="text-3xl   ">
              Best <br />
              <span className="  bg-gradient-to-r from-gray-700 to-orange-400 bg-clip-text text-transparent font-semibold">
                items
              </span>
            </h2>
            <span
              onClick={() => navigate("/shop")}
              className="inline-flex gap-1.5 mt-3 tex-sm text-slate-600  cursor-pointer  font-semibold items-center"
            >
              View More{" "}
              <ArrowRight
                size={12}
                className="transform group-hover:translate-x-3 transition-all"
              />{" "}
            </span>
          </div>
          <div className="ml-3">
            <img src={heroImage1} alt="_productHero1" className="size-40" />
          </div>
        </div>
        <div className="col-span-3 py-8 px-6 group flex items-center gap-15 bg-blue-200 rounded-lg sm:mr-20 m-0">
          <div>
            <h2 className="text-3xl text-indigo-900 font-light">
              8% <br />
              <span className=" bg-gradient-to-r from-indigo-900 to-indigo-400 bg-clip-text text-transparent ">
                discount
              </span>
            </h2>
            <span
              onClick={() => navigate("/product/52")}
              className="inline-flex gap-1.5 mt-3 tex-sm text-slate-600  cursor-pointer  font-semibold items-center"
            >
              View More{" "}
              <ArrowRight
                size={12}
                className="transform group-hover:translate-x-3 transition-all"
              />{" "}
            </span>
          </div>
          <div className="ml-3">
            <img src={heroImage2} alt="_productHero1" className="size-40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
