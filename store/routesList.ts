import { SidebarOption } from "@/types/sidebarOpt";
import dynamic from "next/dynamic";

interface Path {
  path: string;
  breadcrumb: string;
  href: string;
}

export const paths: Path[] = [
  {
    path: "admin/clasificadores",
    breadcrumb: "Clasificadores",
    href: "/admin/clasificadores",
  },
  {
    path: "admin/dependencias",
    breadcrumb: "Listado de Dependecias",
    href: "/admin/dependencias",
  },
  {
    path: "admin/beneficiarios",
    breadcrumb: "Tipos de Beneficiario de Seguro",
    href: "/admin/beneficiarios",
  },
  {
    path: "admin/diagnosticos",
    breadcrumb: "Lista de Diagnósticos (CIE)",
    href: "/admin/diagnosticos",
  },
  {
    path: "admin/especialidad",
    breadcrumb: "Especialidades",
    href: "/admin/especialidad",
  },
  { path: "admin/medicos", breadcrumb: "Medicos", href: "/admin/medicos" },
  {
    path: "admin/pacientes",
    breadcrumb: "Listado de Pacientes",
    href: "/admin/pacientes",
  },
  {
    path: "admin/seguros",
    breadcrumb: "Listado de Seguros",
    href: "/admin/seguros",
  },
  {
    path: "admin/servicios-salud",
    breadcrumb: "Servicios de Salud (Hospitales)",
    href: "/admin/servicios-salud",
  },
  {
    path: "admin/tarifario/nuevo",
    breadcrumb: "Nuevo Registro",
    href: "/admin/tarifario",
  },
  {
    path: "admin/tarifario",
    breadcrumb: "Tarifario",
    href: "/admin/tarifario",
  },

  {
    path: "admin/tipo-examenes",
    breadcrumb: "Lista de Tipos de Exámenes",
    href: "/admin/tipo-examenes",
  },
  {
    path: "config-seguros",
    breadcrumb: "Tipo de Registro",
    href: "/config-seguros",
  },
  {
    path: "reclamaciones/archivados",
    breadcrumb: "Archivados",
    href: "/reclamaciones/archivados",
  },
  {
    path: "reclamaciones/:id",
    breadcrumb: "Editar",
    href: "/reclamaciones/:id",
  },
  {
    path: "reclamaciones",
    breadcrumb: "Reclamaciones",
    href: "/reclamaciones",
  },
  {
    path: "nueva-reclamacion",
    breadcrumb: "Generar Nueva Reclamación",
    href: "/nueva-reclamacion",
  },
  {
    path: "generar-archivos",
    breadcrumb: "Generar Nuevo Archivo",
    href: "/generar-archivos",
  },
  {
    path: "honorarios",
    breadcrumb: "Listado de procedimientos",
    href: "/honorarios",
  },
 
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
