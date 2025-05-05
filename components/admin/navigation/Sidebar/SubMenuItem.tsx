import type React from "react"
import { Circle } from "lucide-react"

interface SubMenuItemProps {
  subItem: string
  setActivePage: (page: string) => void
  isActive: boolean
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ subItem, setActivePage, isActive }) => (
  <li>
    <button
      onClick={() => setActivePage(subItem.toLowerCase())}
      className={`flex items-center w-full text-gray-700 hover:text-white hover:bg-blue-600 text-sm p-2 pl-8 transition-colors duration-200 ${isActive ? "bg-blue-600 text-white" : ""}`}
    >
      <Circle className="h-1.5 w-1.5 mr-2 flex-shrink-0" />
      <span className="truncate">{subItem}</span>
    </button>
  </li>
)

export default SubMenuItem

