// components/general/SectionTitle.tsx
"use client"

import { headingVariant } from "@/lib/animations"
import { motion } from "framer-motion"

interface SectionTitleProps {
  title: string
  className?: string
  color?: string
}

export default function SectionTitle({
  title,
  className = "",
  color = "text-white"
}: SectionTitleProps) {
  return (
    <motion.h2
      className={`text-center text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 font-poppins ${color} ${className}`}
      variants={headingVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {title}
    </motion.h2>
  )
}
