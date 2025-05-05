import React from "react";

/**
 * ******************************************************************************
 *                                 SKELETON PARA TIPO TABLA
 * ******************************************************************************
 * Componente que muestra el sketeleton en forma de tabla.
 *
 */
export default function SkeletonTabla() {
  return (
    <>
      <div
        role="status"
        className="hidden md:flex flex-col w-full animate-pulse divide-y divide-gray-200 rounded-lg border border-gray-200 shadow"
      >
        <div className="flex items-center justify-between space-x-4 bg-dark px-6 py-4 rounded-t-lg ">
          <div className="h-3.5 w-24 rounded-lg bg-gray-100"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-100"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-100"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-100"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-100"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-100"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-100"></div>
        </div>
        <div className="flex items-center justify-between space-x-4 px-6 py-4">
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
        </div>
        <div className="flex items-center justify-between space-x-4 px-6 py-4">
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
        </div>
        <div className="flex items-center justify-between space-x-4 px-6 py-4">
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
        </div>
        <div className="flex items-center justify-between space-x-4 px-6 py-4">
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
        </div>
        <div className="flex items-center justify-between space-x-4 px-6 py-4">
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
        </div>
        <div className="flex items-center justify-between space-x-4 px-6 py-4">
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
        </div>
        <div className="flex items-center justify-between space-x-4 px-6 py-4">
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-3.5 w-24 rounded-lg bg-gray-300"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
      <SkeletonList />
    </>
  );
}

/**
 * ******************************************************************************
 *                                 SKELETON PARA TIPO LISTAS
 * ******************************************************************************
 * Componente que muestra el sketeleton en forma de lista.
 *
 */
const SkeletonList = () => (
  <div className="md:hidden animate-pulse space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="h-6 bg-gray-300 rounded w-full"></div>
    ))}
  </div>
);
