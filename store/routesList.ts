import { SidebarOption } from "@/types/sidebarOpt";
import dynamic from "next/dynamic";

interface Path {
  path: string;
  breadcrumb: string;
  href: string;
}

export const paths: Path[] = [
  { path: "admin/medicos", breadcrumb: "Medicos", href: "/admin" },
  { path: "admin/vacantes", breadcrumb: "Vacantes", href: "/admin" },
  { path: "admin/", breadcrumb: "Admin Panel", href: "/admin" },
];

export const menuItems: SidebarOption[] = [
  {
    name: "home",
    label: "Dashboard",
    href: "/admin",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Home)),
  },
  {
    name: "sitio-web",
    label: "Sitio Web",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Globe)),
    subItems: [
      {
        name: "ir-sitio",
        label: "Ir a sitio",
        href: "/",
      },
      {
        name: "edit-home",
        label: "Editar Inicio",
        href: "/admin/sw/e/home",
      },
      {
        name: "edit-about",
        label: "Editar Sobre Nosotros",
        href: "/admin/sw/e/about",
      },    
    ],
  },
  {
    name: "medicos",
    label: "Medicos",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Users)),
    href: "/admin/medicos",
  },
  {
    name: "vacantes",
    label: "Vacantes",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Briefcase)),
    href: "/admin/vacantes",
  },
  {
    name: "perfil-usuario",
    label: "Mi perfil",
    href: "/admin/perfil-usuario",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Home)),
  },
 
];
