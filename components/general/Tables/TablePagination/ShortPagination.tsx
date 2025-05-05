import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

interface PaginationProps {
  skip: number;
  multiplicador: number;
  nextPage: boolean;
  previousPage: boolean;
  onPageChange: (newSkip: number) => void;
  optionsPerPage: number[];
  registerPerPage: number;
  onLimitChange: (newLimit: number) => void;
}

const ShortPagination: React.FC<PaginationProps> = ({
  skip,
  multiplicador,
  nextPage,
  previousPage,
  onPageChange,
  optionsPerPage,
  registerPerPage,
  onLimitChange,
}) => {
  const limit = skip + multiplicador;

  const handleNext = () => {
    if (nextPage) onPageChange(limit);
  };

  const handlePrevious = () => {
    if (previousPage) onPageChange(skip - multiplicador);
  };

  return (
    <div className="flex items-center justify-between mt-3 sm:px-4 md:px-6">
      <Button
        onClick={handlePrevious}
        disabled={!previousPage}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-dark text-white"
      >
        ← Anterior
      </Button>
      <div className="sm:w-full sm:max-w-[150px] md:max-w-[210px] grid grid-cols-1 text-gray-800">
        <select
          id="location"
          name="location"
          value={registerPerPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className=" col-start-1 row-start-1 w-full appearance-none rounded-full bg-white py-1.5 pl-3 pr-6 sm:pr-8  text-gray-800 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          {optionsPerPage.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="flex flex-row gap-x-1 items-center pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end text-gray-500">
          <span className="hidden sm:hidden">Per page</span>
          <span className="hidden md:flex">Registers per page</span>

          <ChevronDownIcon aria-hidden="true" className="mt-1 size-5" />
        </div>
      </div>

      <Button
        onClick={handleNext}
        disabled={!nextPage}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-dark text-white"
      >
        Siguiente →
      </Button>
    </div>
  );
};

export default ShortPagination;
