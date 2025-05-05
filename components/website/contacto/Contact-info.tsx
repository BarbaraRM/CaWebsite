"use client";

import { EmpresaInforType } from "@/types/website/home";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactInfo({
  contactInfo,
}: {
  contactInfo: EmpresaInforType;
}) {
  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Información de contacto
      </h2>

      <div className="space-y-8">
        {contactInfo?.direccion && (
          <motion.div
            className="flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-[#f59b11] p-3 rounded-full mr-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Dirección</h3>
              <p className="text-gray-600">{contactInfo?.direccion}</p>
            </div>
          </motion.div>
        )}

        {(contactInfo?.telefono || contactInfo?.whatsapp) && (
          <motion.div
            className="flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[#f59b11] p-3 rounded-full mr-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Teléfono</h3>
              <p className="text-gray-600 mt-1">
                {contactInfo?.whatsapp}
              </p>
              <p className="text-gray-600 mt-1">
                {contactInfo?.telefono}
              </p>
            </div>
          </motion.div>
        )}

        {contactInfo?.email && (
          <motion.div
            className="flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-[#f59b11] p-3 rounded-full mr-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Correo electrónico</h3>
              <p className="text-gray-600 mt-1">{contactInfo?.email}</p>
            </div>
          </motion.div>
        )}
      </div>

      {contactInfo?.emergenciasTelf && (
        <motion.div
          className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-medium text-gray-800 mb-2">Emergencias</h3>
          <p className="text-gray-600">
            Para emergencias médicas, llama a nuestro número de emergencia disponible 24/7:
          </p>
          <p className="text-[#f59b11] font-bold text-lg mt-1">
            {contactInfo?.emergenciasTelf}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
