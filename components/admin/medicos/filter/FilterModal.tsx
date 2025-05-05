import { FormLabel } from "@/components/styled/Forms";
import { ValueProps } from "@/types/globals";
import React, { useState } from "react";

export type FiltersOptionsProps = {
  visibles?: { value?: string; label?: string }[];
  especialidad?: ValueProps[];
};

interface FilterModalProps {
  onClose?: () => void;
  onApplyFilters: (filters: MedicoFilterValues | undefined) => void;
  filtersObject: FiltersOptionsProps;
  filters: MedicoFilterValues | undefined;
  setFilters: Function;
}

export interface MedicoFilterValues {
  cedula?: string;
  especialidad?: string;
  nombreCompleto?: string;
  activo?: string;
}

export function MedicoFilterModal({
  onClose,
  onApplyFilters,
  filtersObject,
  filters,
  setFilters,
}: FilterModalProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof MedicoFilterValues, string>>
  >({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev: MedicoFilterValues) => ({ ...prev, [name]: value }));

    // Clear errors when input changes
    if (errors[name as keyof MedicoFilterValues]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Nombres */}
      <div className="flex flex-col">
        <FormLabel>Nombre Completo</FormLabel>
        <input
          type="text"
          name="nombreCompleto"
          value={filters?.nombreCompleto || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nombres y apellidos"
        />
      </div>

      {/* Cedula */}
      <div className="flex flex-col">
        <FormLabel>Cédula</FormLabel>
        <input
          type="text"
          name="cedula"
          value={filters?.cedula || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Cedula de paciente"
        />
      </div>

      {/* Cedula */}
      <div className="flex flex-col">
        <FormLabel>Especialidad</FormLabel>
        <input
          type="text"
          name="especialidad"
          value={filters?.especialidad || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Numero de archivo"
        />
      </div>
      
      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado (Activo o inactivo)
        </label>
        <select
          name="activo"
          value={filters?.activo || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md shadow-sm px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {filtersObject?.visibles?.map((item: any, index: number) => {
            return (
              <option key={index} value={item?.value || ""}>
                {item?.label || ""}
              </option>
            );
          })}
        </select>
      </div>


      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
