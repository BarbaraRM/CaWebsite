import React from "react";

interface CustomTablePaginationProps {
  rowsPerPageOptions: number[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomTablePagination: React.FC<CustomTablePaginationProps> = ({
  rowsPerPageOptions,
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const from = page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, count);

  const handlePrev = () => {
    if (page > 0) onPageChange(null, page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) onPageChange(null, page + 1);
  };

  const handleFirst = () => {
    onPageChange(null, 0);
  };

  const handleLast = () => {
    onPageChange(null, totalPages - 1);
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center text-dark text-xs px-3 py-[2px] bg-[#F1F1F1] gap-3 rounded-[6px]">
      {/* Selector de filas por página */}
      <div className="flex items-center gap-2">
        <span className="text-nowrap font-semibold text-gray-500 ">Filas por página:</span>
        <select
          className="border border-gray-300 rounded px-1 py-0 text-[11px]"
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Rango actual */}
      <div className="text-gray-500 font-semibold flex flex-row">
        {from}–{to} de {count}{" "}
        <span className="hidden md:block ml-1">Registros</span>
      </div>

      {/* Navegación */}
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={handleFirst}
          disabled={page === 0}
          className="px-[2px] py-[2px] text-gray-600 bg-gray-100 border rounded-full hover:bg-white hover:text-dark disabled:opacity-30 transition"
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
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-[2px] py-[2px] text-gray-600 bg-gray-100 border rounded-full hover:bg-white hover:text-dark disabled:opacity-30 transition"
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <span className="px-2 text-gray-700 font-medium">
          Pag {page + 1} / {totalPages || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className="px-[2px] py-[2px] text-gray-600 bg-gray-100 border rounded-full hover:bg-white hover:text-dark disabled:opacity-30 transition"
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={handleLast}
          disabled={page >= totalPages - 1}
          className="px-[2px] py-[2px] text-gray-600 bg-gray-100 border rounded-full hover:bg-white hover:text-dark disabled:opacity-30 transition"
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
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomTablePagination;
