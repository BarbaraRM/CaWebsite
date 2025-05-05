"use client"
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "warning" | "error";
  duration?: number; // Tiempo en milisegundos antes de ocultar el toast
}

const toastStyles = {
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-gray-900",
  error: "bg-red-500 text-white",
};

const Toast = ({ message, type, duration = 3000 }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-10 right-5 px-4 py-2 rounded-md shadow-md transition-opacity animate-fade-in ${toastStyles[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
