import { useContext } from "react";
import { AuthContext } from "./auth-provider";

export function useCheckPerm() {
  const { checkPerm, isLoading } = useContext(AuthContext);

  return {
    checkPerm: (permisos: string[] | string, strict: boolean = false) => {
      const permsArray = Array.isArray(permisos) ? permisos : [permisos];
      return !isLoading && checkPerm(permsArray, strict);
    },
  };
}
