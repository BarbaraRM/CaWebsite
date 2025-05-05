// sin "use client"

import DashboardShell from "@/components/navigation/Sidebar/DashboardShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
