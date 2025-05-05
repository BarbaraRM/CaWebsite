"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import Breadcrumbs from "./Breadcrumbs";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [showChangeSessionDialog, setShowChangeSessionDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex-1 px-4 flex h-12 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Breadcrumbs currentPath={pathname} />
        </div>

        <div className="flex items-center gap-4">
          {/* User Profile */}
          <div className="flex items-center gap-1 ml-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium leading-tight">{user?.name}</p>
              <p className="text-xs text-muted-foreground leading-tight">
                {user?.sesion_name}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-9 w-9 rounded-full bg-primary flex items-end justify-center text-white hover:border-secondary border-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/perfil-usuario" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowChangeSessionDialog(true)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Cambiar Sesión</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a
                    href="/api/auth/logout"
                    className="flex items-center cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
