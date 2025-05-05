"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";

interface ChangeSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeSessionDialog({ open, onOpenChange }: ChangeSessionDialogProps) {
  const { changeSession, user } = useAuth();
  const { toast } = useToast();

  const [selectedRole, setSelectedRole] = useState("");
  const [password, setPassword] = useState("");
  const [openCombobox, setOpenCombobox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"select" | "confirm">("select");

  const availableSessions = user?.sesiones ? Object.keys(user.sesiones) : [];

  const handleContinue = () => {
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Por favor selecciona un rol",
        variant: "destructive",
      });
      return;
    }
    setStep("confirm");
  };

  const handleChangeSession = async () => {
    if (!password) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu contraseña",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await changeSession(selectedRole);
      toast({
        title: "Sesión cambiada",
        description: `Has cambiado tu sesión a ${selectedRole}`,
      });
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Contraseña incorrecta o error al cambiar la sesión",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("select");
    setSelectedRole("");
    setPassword("");
  };

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar Sesión</DialogTitle>
          <DialogDescription>
            {step === "select"
              ? "Selecciona el rol con el que deseas iniciar sesión"
              : "Ingresa tu contraseña para confirmar el cambio de sesión"}
          </DialogDescription>
        </DialogHeader>

        {step === "select" ? (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <div className="relative">
                <button
                  onClick={() => setOpenCombobox(!openCombobox)}
                  className="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-left flex justify-between items-center"
                >
                  {selectedRole
                    ? selectedRole
                    : "Selecciona un rol..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </button>
                {openCombobox && (
                  <div className="absolute z-10 mt-1 w-full bg-white text-black border border-gray-300 rounded shadow">
                    <input
                      type="text"
                      placeholder="Buscar rol..."
                      className="w-full px-2 py-1 border-b border-gray-200 text-sm"
                    />
                    <ul className="max-h-40 overflow-auto text-sm">
                      {availableSessions.map((sessionKey) => (
                        <li
                          key={sessionKey}
                          onClick={() => {
                            setSelectedRole(sessionKey);
                            setOpenCombobox(false);
                          }}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedRole === sessionKey ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {sessionKey}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                autoComplete="new-password"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          {step === "select" ? (
            <Button onClick={handleContinue} disabled={!selectedRole}>
              Continuar
            </Button>
          ) : (
            <Button onClick={handleChangeSession} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
