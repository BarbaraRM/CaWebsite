"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  list: ListItemType[];
}

type ListItemType = { title: string; content: string; icon?: string };

export const Options = ({ list }: Props) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14">
        {list?.map((item: ListItemType, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-[#f7edda] rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#f5a23d] flex items-center justify-center mt-1">
                {item?.icon ? (
                  item?.icon
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                )}
              </div>
              <p className="text-xl font-medium text-[#555555] whitespace-pre-line">
                {item?.title || "Title"}
              </p>
            </div>
            <p className="text-[#555555] text-sm leading-relaxed whitespace-pre-line">
              {item?.content || "Este es el contenido de la descripcion"}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
