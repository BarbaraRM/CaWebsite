"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems:any = [
  { name: "Inicio", href: "/" },
  { name: "Quienes Somos", href: "/quienes-somos" },
  { name: "Nuestros Médicos", href: "/medicos" },
  // {
  //   name: "Servicios",
  //   submenu: [
  //     { name: "Consulta Externa", href: "/servicios/consulta-externa" },
  //     { name: "Laboratorio", href: "/servicios/laboratorio" },
  //     { name: "Imagenología", href: "/servicios/imagenologia" },
  //   ],
  // },
  { name: "Trabaja con Nosotros", href: "/trabaja-con-nosotros" },
  { name: "Contáctanos", href: "/contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openDropdown = (name: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(name);
  };

  const scheduleDropdownClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // delay para permitir moverse sin cerrar
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <img
            src="/images/logo_large_hd_4.png"
            alt="Logo CA"
            className="h-14"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="font-poppins hidden md:flex gap-6 items-center relative">
          {navItems.map((item) =>
            item.submenu ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => openDropdown(item.name)}
                onMouseLeave={scheduleDropdownClose}
              >
                <div className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary cursor-pointer">
                  {item.name} <ChevronDown size={16} />
                </div>

                {activeDropdown === item.name && (
                  <div
                    className="absolute left-0 top-full mt-2 w-48 bg-white shadow-md rounded border z-50"
                    onMouseEnter={() => openDropdown(item.name)}
                    onMouseLeave={scheduleDropdownClose}
                  >
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-sm text-secondary-800 hover:bg-primary hover:text-white"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-secondary-800 hover:text-primary"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Hamburger mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow">
          {navItems.map((item) =>
            item.submenu ? (
              <details key={item.name} className="mb-2">
                <summary className="cursor-pointer font-medium text-gray-700 hover:text-primary flex items-center justify-between">
                  {item.name} <ChevronDown size={16} />
                </summary>
                <div className="pl-4">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-1 text-sm text-gray-600 hover:text-primary"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 font-medium text-gray-700 hover:text-primary"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
