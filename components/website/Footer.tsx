"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Phone,
  MapPin,
  Mail,
  Siren,
} from "lucide-react";
import Image from "next/image";
import { EmpresaInforType } from "@/types/home";

const Footer = ({ footerdata }: { footerdata: EmpresaInforType }) => {
  return (
    <>
      <footer className="bg-[#2e2e2e] text-white">
        {/* Top section with phone and contact button */}
        <div className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-gray-700">
          {footerdata?.emergenciasTelf && (
            <div className="flex items-center gap-2">
              <Siren className="text-white" size={20} />
              <span className="text-white">{footerdata?.emergenciasTelf}</span>
            </div>
          )}
          <Link
            href="/contacto"
            className="bg-[#f29200] text-white px-6 py-2 rounded-full font-medium hover:bg-[#e08600] transition-colors"
          >
            Contáctanos
          </Link>
        </div>

        {/* Main footer content */}
        <div className="text-sm md:text-base container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-6 gap-y-6 gap-x-8">
          {/* Logo and contact info */}
          <div className="hidden md:block w-28 h-28 xl:w-[150px] xl:h-[150px] relative">
            <Image
              src="/images/logo_big.png"
              alt="Clínica Aguilar Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className=" space-y-6 md:col-span-2">
            <div className="space-y-2">
              <h3 className="text-base md:text-xl font-medium mb-2 md:mb-4">Contact us</h3>
              {footerdata?.direccion && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 " />
                  <p>{footerdata?.direccion || ""}</p>
                </div>
              )}
              {footerdata?.telefono && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 "  />
                  <p>{footerdata?.telefono || ""}</p>
                </div>
              )}
              {footerdata?.whatsapp && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 " 
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                      clipRule="evenodd"
                    />
                    <path
                      fill="currentColor"
                      d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                    />
                  </svg>
                  <p>{footerdata?.whatsapp || ""}</p>
                </div>
              )}
              {footerdata?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 "  />
                  <p>{footerdata?.email || ""}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="text-base md:text-xl font-medium mb-2 md:mb-4">Enlaces Rápidos</h3>
            <ul className="px-3 space-y-1 text-gray-400">
              <li>
                <Link
                  href="/quienes-somos"
                  className="hover:text-[#f29200] transition-colors"
                >
                  Quienes somos
                </Link>
              </li>
              <li>
                <Link
                  href="/medicos"
                  className="hover:text-[#f29200] transition-colors"
                >
                  Nuestros medicos
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/servicios"
                  className="hover:text-[#f29200] transition-colors"
                >
                  Servicios
                </Link>
              </li> */}
              <li>
                <Link
                  href="/trabaja-con-nosotros"
                  className="hover:text-[#f29200] transition-colors"
                >
                  Trabaja con nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-[#f29200] transition-colors"
                >
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h3 className="text-base md:text-xl font-medium mb-2 md:mb-4">Síguenos</h3>
            <div className="flex gap-4">
              {footerdata?.socialMedia?.instagram && (
                <Link
                  href={
                    footerdata?.socialMedia?.instagram ||
                    "https://instagram.com"
                  }
                  className="w-10 h-10 bg-[#2e2e2e] border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f29200] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
              )}
              {footerdata?.socialMedia?.facebook && (
                <Link
                  href={
                    footerdata?.socialMedia?.facebook || "https://facebook.com"
                  }
                  className="w-10 h-10 bg-[#2e2e2e] border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f29200] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
              )}
              {footerdata?.socialMedia?.youtube && (
                <Link
                  href={
                    footerdata?.socialMedia?.youtube || "https://youtube.com"
                  }
                  className="w-10 h-10 bg-[#2e2e2e] border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f29200] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </Link>
              )}
              {footerdata?.socialMedia?.linkedin && (
                <Link
                  href={
                    footerdata?.socialMedia?.linkedin || "https://instagram.com"
                  }
                  className="w-10 h-10 bg-[#2e2e2e] border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f29200] transition-colors"
                  aria-label="Instagram"
                >
                  <Linkedin size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs md:text-sm container mx-auto px-4 py-4 text-center border-t border-gray-700 relative">
          <p>© Clínica Aguilar - Todos los derechos reservados</p>

          {/* Back to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute right-4 bottom-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="text-[#2e2e2e]" size={20} />
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
