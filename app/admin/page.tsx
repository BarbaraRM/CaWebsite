"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Home,
  Users,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  const router = useRouter();

  const modules = [
    {
      title: "Inicio Web",
      description: "Edita el contenido de la página principal del sitio.",
      icon: <Home className="w-6 h-6 text-primary" />,
      action: () => router.push("/admin/sw/e/home"),
    },
    {
      title: "Sobre Nosotros",
      description: "Gestiona misión, visión, valores y galería institucional.",
      icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
      action: () => router.push("/admin/sw/e/about"),
    },
    {
      title: "Vacantes Laborales",
      description: "Administra las ofertas de trabajo y postulaciones.",
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      action: () => router.push("/admin/vacantes"),
    },
    {
      title: "Equipo Médico",
      description: "Edita y gestiona la lista de médicos especialistas.",
      icon: <Users className="w-6 h-6 text-primary" />,
      action: () => router.push("/admin/medicos"),
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[1000px] mx-auto w-full">
        {modules.map((mod, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              {mod.icon}
              <CardTitle className="text-lg">{mod.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm text-gray-600">{mod.description}</p>
              <Button onClick={mod.action} className="w-fit">
                Administrar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
