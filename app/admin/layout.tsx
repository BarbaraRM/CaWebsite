"use client";

import Navbar from "@/components/admin/navigation/Navbar/Navbar";
import Sidebar from "@/components/admin/navigation/Sidebar/Sidebar";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
    <div className="flex h-screen bg-white w-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300 overflow-auto">
        <Navbar />
       
          {children}
      </div>
    </div>
    </UserProvider>

  );
}
