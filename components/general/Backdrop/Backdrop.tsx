import React from "react";

interface BackdropProps {
  message?: string;
}

export default function BackdropSave({ message }: BackdropProps) {
  return (
    <div className="backdrop-blur-sm bg-[#68686817] absolute w-full h-full top-0 left-0 flex flex-col justify-start items-center pt-[100px] gap-y-3 z-[100]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F29200]"></div>

      <div className="flex justify-center h-[50px] items-center">
        <span className="animate-loader animation-delay-200 font-semibold text-blue-5000 text-orange-o">
          {message || "Loading..."}
        </span>
      </div>
    </div>
  );
}
