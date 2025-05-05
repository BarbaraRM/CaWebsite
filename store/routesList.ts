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
    label: "Inicio",
    href: "/",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Home)),
  },
  {
    name: "reclamaciones",
    label: "Reclamaciones",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.FileCheck)),
    subItems: [
      {
        name: "nueva-reclamacion",
        label: "Nueva Reclamación",
        href: "/nueva-reclamacion",
      },
      {
        name: "reclamaciones",
        label: "Lista Reclamaciones",
        href: "/reclamaciones",
      },      
      {
        name: "archivos",
        label: "Ver Archivadas",
        href: "/reclamaciones/archivados",
      },
      {
        name: "generar-archivos",
        label: "Generar Archivos",
        href: "/generar-archivos",
      },
      {
        name: "honorarios",
        label: "Ver Honorarios",
        href: "/honorarios",
      },
      
    ],
  },
  {
    name: "listados",
    label: "Listados",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Book)),
    subItems: [
      {
        name: "pacientes",
        label: "Pacientes",
        href: "/admin/pacientes",
      },
      {
        name: "medicos",
        label: "Médicos",
        href: "/admin/medicos",
      },
      {
        name: "tarifario",
        label: "Tarifario",
        href: "/admin/tarifario",
      },
      // {
      //   name: "seguros",
      //   label: "Conf. Seguros",
      //   href: "/admin/config-seguros",
      // },
    ],
  },
  {
    name: "administrativo",
    label: "Administrativo",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.User)),
    subItems: [
      {
        name: "dependencia",
        label: "Dependencias",
        href: "/admin/dependencias",
      },
      {
        name: "seguros",
        label: "Tipos de Seguro",
        href: "/admin/seguros",
      },
      {
        name: "beneficiarios",
        label: "Tipos de Beneficiarios",
        href: "/admin/beneficiarios",
      },
      {
        name: "diagnosticos",
        label: "Diagnósticos",
        href: "/admin/diagnosticos",
      },
      {
        name: "tipos-examenes",
        label: "Tipos de Examen",
        href: "/admin/tipo-examenes",
      },
      {
        name: "clasificadores",
        label: "Clasificadores",
        href: "/admin/clasificadores",
      },
      {
        name: "especialidades",
        label: "Especialidades",
        href: "/admin/especialidad",
      },
      {
        name: "servicios-salud",
        label: "Servicios de Salud",
        href: "/admin/servicios-salud",
      },
    ],
  },
  {
    name: "perfil-usuario",
    label: "Mi perfil",
    href: "/perfil-usuario",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Home)),
  },
  {
    name: "configuracion",
    label: "Configuración",
    icon: dynamic(() => import("lucide-react").then((mod) => mod.Settings)),
    subItems: [
      {
        name: "empresa",
        label: "Datos Empresa",
        href: "/empresa",
      },
      {
        name: "gestion-usuarios",
        label: "Gestión de Usuario",
        href: "/admin/gestion-usuarios",
      },
    ],
  },
];
