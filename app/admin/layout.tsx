"use client";

import Navbar from "@/components/admin/navigation/Navbar/Navbar";
import Sidebar from "@/components/admin/navigation/Sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white w-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300 overflow-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
