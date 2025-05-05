// app/not-found.tsx
"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    console.warn("Página no encontrada");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">¡Oops! Página no encontrada</h2>
      <p className="text-gray-600 mb-6">
        La ruta que estás intentando visitar no existe o fue movida.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-400 hover:text-dark transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
