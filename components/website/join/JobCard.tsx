"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { JobModal } from "./JobModal";
import { OfertaLaboral } from "@/types/oferta";
import { motion } from "framer-motion";

interface JobCardProps {
  job: OfertaLaboral;
}

export function JobCard({ job }: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div
          className="h-48 relative group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={job?.imageUrl || ""}
            alt={`${job.title} - imagen`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="bg-[#f29200] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Search className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3
            title={job.title}
            className="text-[#2e2e2e] text-2xl font-bold line-clamp-2"
          >
            {job.title}
          </h3>
          <p className="text-[#656575] mb-4">Postula hasta el {job.deadline}</p>
          <p
            title={job.description}
            className="text-[#656575] text-base mb-6 line-clamp-2"
          >
            {job.description || ""}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="block w-full text-center bg-[#f29200] hover:bg-[#f59b11] text-white font-medium py-3 px-4 rounded transition-colors"
          >
            POSTULA AQUÍ
          </button>
        </div>
      </motion.div>

      <JobModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
