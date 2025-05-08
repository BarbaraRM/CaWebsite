"use client";

import { Eye } from "lucide-react";

export default function PreviewButton({ data }: { data: any }) {
  const handlePreview = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("home_preview_data", JSON.stringify(data));
      window.open("/preview", "_blank");
    }
  };

  return (
    <button
      onClick={handlePreview}
      className="border border-gray-400 rounded-md px-3 py-1.5 flex flex-row gap-x-1 items-center text-sm"
    >
      <Eye className="w-4 h-4" />
      Previsualizar
    </button>
  );
}
