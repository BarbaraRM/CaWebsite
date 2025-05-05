import React from "react";

interface BackdropProps {
  message?: string;
}

export default function BackdropSave({ message }: BackdropProps) {
  return (
    <div className="backdrop-blur-sm bg-[#68686817] absolute w-full h-full top-0 left-0 flex flex-col justify-start items-center pt-[100px] gap-y-3 z-[100]">
      {/* <svg
        className="animate-spin h-8 w-8 text-border-[#F29200]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg> */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F29200]"></div>

      <div className="flex justify-center h-[50px] items-center">
        <span className="animate-loader animation-delay-200 font-semibold text-blue-5000 text-orange-o">
          {message || "Loading..."}
        </span>
      </div>
    </div>
  );
}
