// ✅ Archivo: app/login/page.tsx (con rate-limit y login completo)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, }),
      }); 

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Error en login");
      }

      const { user, sessions, token } = await res.json();

      if (sessions?.length > 0) {
        router.replace("/select-role");
      } else {
        const complete = await fetch("/api/auth/complete-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user }),
        });
        const { newtoken } = await complete.json();
        sessionStorage.setItem("temp_user", newtoken);
        localStorage.setItem("token", token);

        const decoded: any = jwtDecode(token);
        const expTime = decoded.exp * 1000;
        localStorage.setItem("token_exp", expTime.toString());
        window.dispatchEvent(new Event("storage"));
        router.replace("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || isAuthenticated) {
    return null; // o un loader si prefieres
  }

  return (
    <div className="text-dark flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <Image
            src="/images/logo.png"
            alt="Logo del Hospital"
            width={80}
            height={80}
            className="mx-auto mb-2"
          />
          <CardTitle className="text-2xl font-bold text-center">
            Sistema de Planillaje CA{" "}
          </CardTitle>
          <p className="text-center font-bold text-xl text-dark">
            Iniciar Sesión
          </p>
          <CardDescription className="text-center">
            Ingresa tu usuario y contraseña para acceder al sistema
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full " disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Iniciando..." : "Iniciar sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
