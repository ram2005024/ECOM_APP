import { Loader } from "lucide-react";
import React from "react";

const LoadingSmallDiv = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <Loader className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSmallDiv;
