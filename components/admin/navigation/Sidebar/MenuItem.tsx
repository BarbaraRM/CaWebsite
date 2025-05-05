import type React from "react"
import { ChevronRight } from "lucide-react"
import SubMenuItem from "./SubMenuItem"


interface MenuItemProps {
  item: {
    name: string
    label: string
    icon: React.ElementType
    subItems: string[]
  }
  isCollapsed: boolean
  activeMenu: string | null
  setActiveMenu: (menu: string | null) => void
  setActivePage: (page: string) => void
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isCollapsed, activeMenu, setActiveMenu, setActivePage }) => {
  const isActive = activeMenu === item.name

  return (
    <li>
      <button
        onClick={() => setActiveMenu(isActive ? null : item.name)}
        className={`flex items-center text-gray-700 w-full ${
          isCollapsed ? "justify-center" : "justify-between"
        } hover:bg-blue-100 p-2 transition-colors duration-200 ${isActive ? "bg-blue-100" : ""}`}
      >
        <span className="flex items-center">
          <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
          {!isCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
        </span>
        {!isCollapsed && (
          <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isActive ? "rotate-90" : ""}`} />
        )}
      </button>
      {isActive && !isCollapsed && (
        <ul className="mt-1 mb-2">
          {item.subItems.map((subItem) => (
            <SubMenuItem key={subItem} subItem={subItem} setActivePage={setActivePage} isActive={false} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default MenuItem

