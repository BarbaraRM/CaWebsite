"use client";
interface AlertProps {
  title: string;
  message?: string;
}
export default function FormAlertError({ title, message }: AlertProps) {
  return (
    <div className="bg-red-50 p-2 mt-2">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className="ml-2">
          <h3 className={`font-poppins text-[13px] font-medium text-red-800 `}>
            {title || "Someting went wrong"}
          </h3>
          <p className="font-nunito text-[12px] text-brand-secondary ">
            {message || "Please try again later or contact our support team."}
          </p>
        </div>
      </div>
    </div>
  );
}
