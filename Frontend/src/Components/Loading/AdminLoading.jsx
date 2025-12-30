import React from "react";
import { Loader } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="row-span-8 col-span-9 flex items-center justify-center  bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
