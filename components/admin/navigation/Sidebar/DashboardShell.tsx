"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/navigation/Navbar/Navbar";
import Sidebar from "@/components/navigation/Sidebar/Sidebar";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, pathname]);

  if (isLoading || !isAuthenticated) return null;

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
