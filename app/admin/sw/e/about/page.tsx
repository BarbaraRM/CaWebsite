"use client";
import AboutSectionsAdmin from "@/components/adminPages/AboutAdminPage";
import React from "react";
import { useState } from "react";

export default function AdminHomePage() {
  const [sections, setSections] = useState([]); // o carga desde API/DB

  return (
    <div className="p-6 ">
      <AboutSectionsAdmin sections={sections} onChange={setSections} />
    </div>
  );
}
