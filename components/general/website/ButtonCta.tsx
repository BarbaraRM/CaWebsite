"use client";

import Link from "next/link";
import { cn } from "@/lib/utils"; // usa tu utilitario `cn()` si tienes
import { motion } from "framer-motion";

interface CustomLinkButtonProps {
  href: string;
  label: string;
  variant?: "orange" | "dark" | "blue";
  className?: string;
}

const buttonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.4 } },
  };

export default function CustomLinkButton({
  href,
  label,
  variant = "orange",
  className = "",
}: CustomLinkButtonProps) {
  const baseClasses =
    "py-3 px-6 rounded-md transition-colors text-base md:text-xl font-medium transition-colors";

  const variantClasses =
    variant === "orange"
      ? "bg-primary hover:bg-primary/90 text-white"
      : "bg-white text-primary";

  return (
    <motion.div
      variants={buttonVariant}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={href} className={cn(baseClasses, variantClasses, className)}>
        {label}
      </Link>
    </motion.div>
  );
}
