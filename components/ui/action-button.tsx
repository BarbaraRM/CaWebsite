import type React from "react";

export function ActionButton({
  icon,
  color,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  color: "gray" | "red" | "orange" | "blue" | "green";
  onClick?: any;
  title?: string;
}) {
  const colorClasses = {
    gray: "border-[#737373] text-[#737373] hover:bg-[#efefef]",
    red: "border-[#7d1921] text-[#7d1921] hover:bg-red-50",
    orange: "border-[#ff6f18] text-[#ff6f18] hover:bg-orange-50",
    blue: "border-blue-500 text-blue-500 hover:bg-blue-50",
    green: "border-green-500 text-green-500 hover:bg-green-50",
  };

  return (
    <button
      onClick={onClick}
      title={title|| ""}
      className={`px-3 py-1 rounded border ${colorClasses[color]} flex items-center justify-center transition-colors`}
    >
      {icon}
    </button>
  );
}
