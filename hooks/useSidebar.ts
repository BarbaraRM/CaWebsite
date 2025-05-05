import { useState } from "react"

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activePage, setActivePage] = useState("home")

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return { isCollapsed, activePage, setActivePage, toggleSidebar }
}

