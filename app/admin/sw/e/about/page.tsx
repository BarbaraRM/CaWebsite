"use client";
import HomeSectionsAdmin from "@/components/adminPages/HomeAdminPage";
import React from "react";
import { useState } from "react";

export default function AdminHomePage() {
  const [sections, setSections] = useState([]); // o carga desde API/DB

  return (
    <div className="p-6 ">
      
      <HomeSectionsAdmin sections={sections} onChange={setSections} />
    </div>
  );
}
