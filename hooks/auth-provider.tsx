// ✅ Archivo: hooks/auth-provider.tsx (con control de expiración, checkPerm y changeSession)
"use client";

import React, { createContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "@/components/ui/use-toast";
import type { UsuarioInterface } from "@/types/users";

interface AuthContextType {
  user: UsuarioInterface | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  getToken: () => string | undefined;
  checkPerm: (perms: string[], strict?: boolean) => boolean;
  changeSession: (sessionId: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  logout: () => {},
  getToken: () => undefined,
  checkPerm: () => false,
  changeSession: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UsuarioInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExp = localStorage.getItem("token_exp");

    if (!token || !tokenExp) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const expTime = parseInt(tokenExp);
    const now = Date.now();

    if (now >= expTime) {
      logout();
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const userDecoded = decoded.user || decoded;
      const sesionActiva = localStorage.getItem("sesion_activa");

      if (sesionActiva && userDecoded.sesiones) {
        const sesion = userDecoded.sesiones[sesionActiva];
        if (sesion) {
          setUser({ ...userDecoded, roles: sesion.roles || [] });
        } else {
          setUser(userDecoded);
        }
      } else {
        setUser(userDecoded);
      }
    } catch {
      logout();
    }

    const tenMin = expTime - 10 * 60 * 1000;
    const fiveMin = expTime - 5 * 60 * 1000;
    const nowDate = Date.now();

    if (tenMin > nowDate) {
      setTimeout(() => {
        toast({
          title: "Tu sesión expirará en 10 minutos",
          description: "Por favor guarda tu trabajo.",
        });
      }, tenMin - nowDate);
    }

    if (fiveMin > nowDate) {
      setTimeout(() => {
        toast({
          title: "Tu sesión expirará en 5 minutos",
          description: "Considera renovar tu sesión.",
        });
      }, fiveMin - nowDate);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/login", "/select-role"];
      if (!user && !publicRoutes.includes(pathname)) {
        router.replace("/login");
      } else if (user && publicRoutes.includes(pathname)) {
        router.replace("/");
      }
    }
  }, [user, isLoading, pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    localStorage.removeItem("sesion_activa");
    setUser(null);
    router.replace("/login");
  };

  const getToken = () => {
    return localStorage.getItem("token") || undefined;
  };

  const changeSession = (sessionId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const baseUser = decoded.user || decoded;

      if (baseUser.sesiones && baseUser.sesiones[sessionId]) {
        const sesion = baseUser.sesiones[sessionId];
        localStorage.setItem("sesion_activa", sessionId);
        setUser({ ...baseUser, roles: sesion.roles || [] });
      } else {
        toast({
          title: "Sesión inválida",
          description: "No se encontró la sesión seleccionada.",
        });
      }
    } catch (err) {
      console.error("Error cambiando sesión:", err);
      logout();
    }
  };

  const checkPerm = (perms: string[], strict: boolean = false): boolean => {
    try {
      if (!user) return false;

      let roles: string[] = [];

      if (user.roles && Array.isArray(user.roles)) {
        roles = [...user.roles.map((rol) => rol.toUpperCase())];
      }

      if (user.meds && Array.isArray(user.meds)) {
        user.meds.forEach((med) => {
          if (med.roles && Array.isArray(med.roles)) {
            roles.push(...med.roles.map((rol) => rol.toUpperCase()));
          }
        });
      }

      if (!strict) {
        perms.push("ADMIN");
      }
      const permisosNecesarios = perms.map((perm) => perm.toUpperCase());

      return permisosNecesarios.some((permiso) => roles.includes(permiso));
    } catch (error) {
      console.error("Error al verificar permisos:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
        getToken,
        checkPerm,
        changeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
