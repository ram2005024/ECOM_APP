import { DollarSign, Star } from "lucide-react";
import { useSelector } from "react-redux";
const Shop = () => {
  const products = useSelector((state) => state.products.products);
  console.log(products);
  return (
    <div className="min-h-screen m-w-screen ">
      <hr className="text-gray-300 " />

      <div className="w-10/12 mx-auto mt-10 mb-15 ">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">
            <span className="text-2xl text-green-700">All</span> Products
          </h2>
          <div className="flex flex-wrap gap-10 ">
            {products.map((i) => {
              // const rating = Math.floor(i.rating.slice(0, 1)[0].rating);
              const dummyImage = i.image.slice(0, 1);
              return (
                <div className="group cursor-pointer">
                  <div className="size-50 border border-gray-100 flex items-center justify-center group bg-white rounded-lg">
                    <img
                      src={dummyImage}
                      alt="_productImage"
                      className="size-30 bg-white rounded-lg transform transition-all group-hover:scale-110"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                      <span className="text-sm">{i.name}</span>
                      {/* <span className="flex gap-1.5">
                        {Array(5)
                          .fill(null)
                          .map((_, index) => {
                            return (
                              <Star
                                key={index}
                                size={12}
                                className={
                                  index < rating
                                    ? "fill-emerald-500 text-emerald-600"
                                    : "fill-gray-400 text-gray-400"
                                }
                              />
                            );
                          })}
                      </span> */}
                    </div>
                    <div className="flex gap-1.5">
                      <div className=" text-sm">${i.price}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
