import { SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  eventName?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "search",
  eventName = "",
}) => {
  const [searchText, setSearchText] = useState("");

  const onhandleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const onhandleClearAll = () => {
    setSearchText("");
  };

  useEffect(() => {
    sessionStorage.setItem(
      `hisca_table_searchTxt${eventName}`,
      JSON.stringify(searchText)
    );
    window.dispatchEvent(new Event(`storage${eventName}`));
  }, [searchText]);

  return (
    <>
      <div className="w-full max-w-lg flex">
          <div className="relative flex grow">
            <input
              id="query"
              name="query"
              type="text"
              value={searchText}
              onChange={onhandleChange}
              placeholder={placeholder}
              className={`block w-full rounded-md bg-white py-1.5 pl-10 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6`}
            />
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 sm:size-4"
            />
            {searchText && (
              <button
                type="button"
                onClick={onhandleClearAll}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <XIcon className="size-4 text-red-600"/>
              </button>
            )}
          </div>
         {/*  {searchText && (
            <button
              type="button"
              className="flex shrink-0 items-center gap-x-1.5 rounded-r-md border border-gray-700 outline bg-gray-700 px-3 py-2 text-sm font-semibold text-white outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
              Search
            </button>
          )} */}
        </div>
    </>
  );
};

export default SearchInput;
