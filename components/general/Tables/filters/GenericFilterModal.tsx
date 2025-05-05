import {
  GeneralFilterValues,
} from "@/components/general/Tables/filters/FilterBtn";
import { FormLabel } from "@/components/styled/Forms";
import React, { useState } from "react";

export type FiltersGeneralOptionsProps = {
  visibles?: { value?: string; label?: string }[];
};

interface FilterModalProps {
  onClose?: () => void;
  onApplyFilters: (filters: GeneralFilterValues | undefined) => void;
  filters: GeneralFilterValues | undefined;
  setFilters: (value: any) => void;
  filtersObject: FiltersGeneralOptionsProps;
}

export function GenericFilterModal({
  onClose,
  onApplyFilters,
  filtersObject,
  filters,
  setFilters,
}: FilterModalProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof GeneralFilterValues, string>>
  >({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev: GeneralFilterValues) => ({ ...prev, [name]: value }));

    // Clear errors when input changes
    if (errors[name as keyof GeneralFilterValues]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Nombre de Especialidad */}
      <div className="flex flex-col">
        <FormLabel>Nombre</FormLabel>
        <input
          type="text"
          name="nombre"
          value={filters?.nombre || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nombre de la especialidad"
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
