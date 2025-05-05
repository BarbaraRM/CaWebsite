//componentes/sidebar.ts
"use client";

import type React from "react";
import { useState } from "react";
import { Menu, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/store/routesList";

const Sidebar = ({}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const classNames = {
    container: {
      def: "flex-1 flex flex-col justify-center items-center self-center py-1 px-4 text-center",
      col: "mt-7 cursor-pointer",
      open: "mt-0",
    },
    title: {
      def: "text-sidebar-title font-semibold leading-tight font-poppins",
      col: "text-sm",
      open: "text-lg",
    },
    colBtn: {
      col: "top-1 self-center fixed self-center p-1 text-white hover:bg-gray-500 rounded-full transition-colors duration-200",
      open: "top-2 right-2 absolute p-1 text-white hover:bg-gray-500 rounded-full transition-colors duration-200",
    },
  };

  return (
    <div
      className={`top-0 left-0 h-screen ${
        isCollapsed ? "w-16" : "w-[250px]"
      } bg-sidebar-bg text-sidebar-text hover:text-sidebar-active shadow-lg transition-all duration-300 overflow-hidden`}
    >
      <div className="flex flex-col h-full">
        <div className="relative flex items-center justify-center">
          <button
            onClick={toggleSidebar}
            className={classNames?.colBtn?.[isCollapsed ? "col" : "open"]}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div
            className={`${classNames?.container?.def} ${
              classNames?.container?.[isCollapsed ? "col" : "open"]
            } `}
            onClick={() => {
              if (isCollapsed) {
                toggleSidebar();
              }
            }}
          >
            <Image
              src="/images/logo.png" // ruta desde la carpeta public
              alt="Logo del Hospital"
              width={isCollapsed ? 50 : 100}
              height={isCollapsed ? 50 : 100}
              className="mx-auto transition-transform duration-400"
            />
            <span
              className={`${classNames?.title?.def} ${
                classNames?.title?.[isCollapsed ? "col" : "open"]
              } `}
            >
              {isCollapsed ? "SIPCA" : "Sistema Planillaje CA"}
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto pt-2 pb-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.href ? (
                  <Link
                    prefetch
                    href={item.href}
                    onClick={() =>
                      setActiveMenu(activeMenu === item.name ? null : item.name)
                    }
                    className={`flex items-center text-sidebar-text w-full ${
                      isCollapsed ? "justify-center" : "justify-between"
                    } hover:bg-sidebar-hover hover:text-sidebar-active hover:border-l-2 border-sidebar-active px-2 py-2 transition-colors duration-200`}
                  >
                    <span className="flex items-center">
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <span className="ml-2 font-poppins text-sm font-light">
                          {item.label}
                        </span>
                      )}
                    </span>
                    {!isCollapsed && (item?.subItems || []).length > 0 && (
                      <span
                        className={`transition-transform duration-200 ${
                          activeMenu === item.name ? "rotate-90" : ""
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === item.name ? null : item.name)
                    }
                    className={`flex items-center text-sidebar-text w-full ${
                      isCollapsed ? "justify-center" : "justify-between"
                    } hover:bg-sidebar-hover hover:text-sidebar-active hover:border-l-2 border-sidebar-active px-2 py-2 transition-colors duration-200`}
                  >
                    <span className="flex items-center">
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <span className="ml-2 font-poppins text-sm font-light">
                          {item.label}
                        </span>
                      )}
                    </span>
                    {!isCollapsed && (item?.subItems || []).length > 0 && (
                      <span
                        className={`transition-transform duration-200 ${
                          activeMenu === item.name ? "rotate-90" : ""
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                )}

                {activeMenu === item.name &&
                  !isCollapsed &&
                  (item?.subItems || [])?.length > 0 && (
                    <ul className="ml-7 mr-2 mb-3">
                      {(item?.subItems || [])?.map((subItem) => (
                        <li key={subItem?.label}>
                          {subItem?.href ? (
                            <Link
                              prefetch
                              href={subItem.href}
                              className="flex items-center w-full text-sidebar-text rounded-e-md hover:bg-sidebar-hover hover:text-sidebar-active hover:underline text-sm p-2 transition-colors duration-200"
                            >
                              {subItem.label}
                            </Link>
                          ) : (
                            <label className="flex items-center w-full text-sidebar-text rounded-e-md hover:bg-sidebar-hover hover:text-sidebar-active hover:underline text-sm p-2 transition-colors duration-200">
                              {subItem.label}
                            </label>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
