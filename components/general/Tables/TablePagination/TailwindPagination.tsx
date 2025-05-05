import React from "react";
import { useState, useEffect } from "react";

interface PaginationProps {
  totalItems: number;
  initialPage?: number;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const ResponsivePagination: React.FC<PaginationProps> = ({
  totalItems,
  initialPage: page = 1,
  initialRowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  useEffect(() => {
  }, [rowsPerPage]);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newRowsPerPage = Number.parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    onRowsPerPageChange(newRowsPerPage);
  };

  const startIndex = (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(startIndex + rowsPerPage - 1, totalItems);

  return (
    <div className="text-[12px] flex flex-col space-y-1 w-full bg-gradient-to-r from-[#bbc7d17a] to-white px-2 py-1 shadow-lg text-gray-700">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-2">
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="bg-white text-gray-700 border-2 border-gray-300 rounded-md px-1 py-[2px] text-[12px] font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="text-[12px] font-semibold whitespace-nowrap">
          <span className="font-bold">
            {startIndex}-{endIndex}
          </span>{" "}
          de <span className="font-bold">{totalItems}</span>
          {" Items"}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-1">
          <button
            onClick={(e) => {
              e?.preventDefault();
              handlePageChange(1);
            }}
            disabled={page === 1}
            className="p-1 rounded-full bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="First page"
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
            onClick={(e) => {
              e?.preventDefault();
              handlePageChange(page - 1);
            }}
            disabled={page === 1}
            className="p-1 rounded-full bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Previous page"
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

          <div className="flex items-center bg-white rounded-full px-3 py-[2px]">
            <span className="text-gray-700 font-semibold">
              {page} / {totalPages}
            </span>
          </div>

          <button
            onClick={(e) => {
              e?.preventDefault();
              handlePageChange(page + 1);
            }}
            disabled={page === totalPages}
            className="p-1 rounded-full bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Next page"
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
            onClick={(e) => {
              e?.preventDefault();
              handlePageChange(totalPages);
            }}
            disabled={page === totalPages}
            className="p-1 rounded-full bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Last page"
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
    </div>
  );
};

export default ResponsivePagination;
