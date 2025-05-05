"use client";

import { SlidersHorizontal } from "lucide-react";
import React, { ReactNode, useState } from "react";

interface FilterBtnProps {
  resetFilters?: ()=>void;
  children: ReactNode;
}

export interface GeneralFilterValues {
  nombre?: string;
  activo?: string;
}

export interface BaseFilterModalProps {
  onClose: () => void;
  onApplyFilters: (filters: any | undefined) => void;
  filtersObject: any;
  filters: any | undefined;
  setFilters: ()=>void;
}

const FilterBtn = ({ children, resetFilters }: FilterBtnProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsFilterOpen(true)}
        className="leading-tight inline-flex items-center px-4 py-2 h-fit border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filters
      </button>
      {/* Filter Sidebar */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-[500]">
          <div className="w-80 bg-white py-4 shadow-lg h-full relative  flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setIsFilterOpen(false)}
            >
              ✕
            </button>
            <h2 className="px-4 text-lg font-semibold">Filters</h2>
            {resetFilters && (
              <button
                onClick={(e) => {
                  e?.preventDefault();
                  resetFilters();
                  setIsFilterOpen(false);
                }}
                className="px-4 self-end flex flex-row items-center py-1 hover:bg-gray-100 text-red-500 gap-x-1 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Restore all
              </button>
            )}
            {/* Add filter options here */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBtn;
