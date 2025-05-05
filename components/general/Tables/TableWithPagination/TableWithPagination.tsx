"use client";
import React, { ReactNode, useEffect, useState } from "react";

import { TableTitles } from "../interfaces/TitulosTablas";
import { searchMethod } from "../helper/searxhByString";
import { filtrarObjetos } from "../helper/filtrarLista";
import { getOcultarColumn } from "../helper/tableValidation";
import ResponsivePagination from "../TablePagination/TailwindPagination";
import SkeletonTabla from "../SklTable/SklTable";
import Toast from "../../Toast/Toast";

interface TableInterface {
  children?: Function; //Se envia como hijo la Fila a Mostrar
  titles: TableTitles[]; //Array con los titulos de la tabla
  data: any[]; //Array con los datos de la tabla la estructura del objeto varia segun el caso.
  filtersToApply?: string[]; //array con los identificadores para aplicar los filtros
  searchName?: string;
  multiplicador?: number; //numero inicial pora la cantidad de registros por paginas
  rowsPerPageOptions?: number[]; //Array para las opciones de numero por pagina
  hiddePagination?: boolean;
  mobileViewType?: "table" | "list"; // Tipo de vista en móvil ('table' o 'list')
  customSkeleton?: ReactNode; // Componente Skeleton personalizado opcional
  loading?: boolean; //Bandera para mostrar el skeleton mientras cargan los datos (opcional)
}

export interface ItemsF {
  category: string;
  selected: string[];
  hide?: "row" | "col" | "none";
}

interface filtersInTable {
  [key: string]: string[];
}

/**
 * Tabala con paginacion y registros por pagina.
 * @param {TableInterface} param
 * @returns
 */

export default function TableWithPagination({
  children,
  titles,
  data,
  filtersToApply,
  searchName,
  multiplicador,
  rowsPerPageOptions,
  hiddePagination = false,
  mobileViewType = "table", // 'table' o 'list'
  customSkeleton, // Componente Skeleton personalizado
  loading = false,
}: TableInterface) {
  const [searchText, setsearchText] = useState<string>("");
  const [rowFilters, setRowFilters] = useState<filtersInTable[]>();
  const [colFilters, setColFilters] = useState<string[]>();

  const [filtrosAplicados, setfiltrosAplicados] = useState(false);
  const [colFiltrosAplicados, setColFiltrosAplicados] = useState(false);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [optionsPerPage, setOptionsPerPage] = useState<number[]>([
    10, 25, 50, 100,
  ]);

  const [tableData, settableData] = useState<any>([]);
  const [tablaFiltrada, setTablaFiltrada] = useState<any>([]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (numberSel: number) => {
    setRowsPerPage(numberSel);
    setPage(1);
  };

  const buscarFiltrosAlmacenadosSS = (filterName: string) => {
    if (
      sessionStorage.getItem(`filter${filterName}`) &&
      sessionStorage.getItem(`filter${filterName}`) !== null
    ) {
      let filterTEmp: ItemsF[] = JSON.parse(
        sessionStorage.getItem(`filter${filterName}`) || ""
      );
      let tempRow: filtersInTable[] = [];
      let tempCol: string[] = [];

      filterTEmp?.map((val: ItemsF, index: number) => {
        if (val?.hide === "row") {
          tempRow.push({
            [val?.category]: val?.selected?.reduce(
              (prev: string[], next: any) => {
                prev.push(next?.value + "");
                return prev;
              },
              []
            ),
          });
        } else if (val?.hide === "col") {
          tempCol.push(
            ...val?.selected?.reduce((prev: string[], next: any) => {
              prev.push(`${val?.category}/${next?.value + ""}`);
              return prev;
            }, [])
          );
        }
        return "";
      });
      setRowFilters(tempRow);
      setColFilters(tempCol);
    } else {
      setRowFilters([]);
      setColFilters([]);
    }
  };

  useEffect(() => {
    if (!filtrosAplicados) {
      settableData(
        searchMethod({ snip: searchText, tipobusqueda: 0, dataO: data })
      );
    } else {
      settableData(
        searchMethod({
          snip: searchText,
          tipobusqueda: 0,
          dataO: tablaFiltrada,
        })
      );
    }
    setPage(0);
  }, [searchText, data, filtrosAplicados]);

  useEffect(() => {
    window.addEventListener(`storage${searchName}`, () => {
      let textToSearch = JSON.parse(
        sessionStorage.getItem(`table_searchTxt${searchName}`) || ""
      );
      setsearchText(textToSearch?.toLowerCase());
    });

    filtersToApply?.map((filterName: string, index: number) => {
      window.addEventListener(`filter${filterName}`, () => {
        buscarFiltrosAlmacenadosSS(filterName);
        return "";
      });
    });

    filtersToApply?.map((filterName: string, index: number) => {
      buscarFiltrosAlmacenadosSS(filterName);
      return "";
    });

    return () => {
      window.removeEventListener(`storage${searchName}`, () => {});
      filtersToApply?.map((filterName: string, index: number) => {
        window.removeEventListener(`filter${filterName}`, () => {});
        return "";
      });
    };
  }, []);

  useEffect(() => {
    let fileredData: any = [];
    if (rowFilters && rowFilters?.length > 0) {
      fileredData = filtrarObjetos(data, rowFilters, true);
    } else {
      fileredData = data;
    }
    settableData(fileredData);
    setTablaFiltrada(fileredData);
    setPage(0);
  }, [rowFilters]);

  useEffect(() => {
    if (!rowFilters || (rowFilters && rowFilters?.length <= 0)) {
      setfiltrosAplicados(false);
    } else {
      setfiltrosAplicados(true);
    }
    if (!colFilters || (colFilters && colFilters?.length <= 0)) {
      setColFiltrosAplicados(false);
    } else {
      setColFiltrosAplicados(true);
    }
  }, [rowFilters, colFilters]);

  useEffect(() => {
    if (
      multiplicador &&
      multiplicador !== 0 &&
      rowsPerPageOptions &&
      rowsPerPageOptions?.length > 0
    ) {
      setRowsPerPage(multiplicador);
      if (!rowsPerPageOptions?.includes(multiplicador)) {
        setOptionsPerPage(
          [multiplicador, ...rowsPerPageOptions].slice().sort((a, b) => a - b)
        );
      } else {
        setOptionsPerPage(rowsPerPageOptions);
      }
    }
  }, [multiplicador, rowsPerPageOptions]);

  useEffect(() => {
    settableData(data);
  }, [data]);

  if (loading) {
    return customSkeleton ? customSkeleton : <SkeletonTabla />;
  }

  return (
    <>
      {/* <div className="flex-1 overflow-auto"> */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {mobileViewType === "list" && (
          <ul className="space-y-2 md:hidden">
            {tableData.map((row: any, index: number) =>
              children ? (
                children(row, index)
              ) : (
                <li
                  key={`esp${index}`}
                  className="p-4 border rounded-lg shadow"
                >
                  {titles?.map((item: any) => (
                    <div key={item.key} className="flex justify-between">
                      <span className="font-bold">{item?.label}:</span>
                      <span>{row[item?.key]}</span>
                    </div>
                  ))}
                </li>
              )
            )}
          </ul>
        )}
        <table
          className={`min-w-full divide-y divide-gray-200 ${
            mobileViewType === "list" ? "hidden md:table" : ""
          }`}
        >
          <thead className="bg-dark">
            <tr>
              {titles?.map((item: any, index: number) => {
                if (
                  !colFiltrosAplicados ||
                  (colFiltrosAplicados &&
                    !getOcultarColumn(
                      item?.key,
                      colFiltrosAplicados,
                      colFilters
                    ))
                ) {
                  return (
                    <th
                      key={index}
                      style={
                        item?.sticky
                          ? {
                              position: "sticky",
                              left: item?.position || 0,
                              zIndex: 3,
                              backgroundColor: "white",
                              fontWeight: "bold",
                            }
                          : {}
                      }
                      className={`px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider ${item?.className} `}
                      align={item?.align}
                      title={item?.label}
                    >
                      {item?.label}
                    </th>
                  );
                }
                return null;
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {children
              ? tableData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) =>
                    children(row, index, colFiltrosAplicados ? colFilters : [])
                  )
              : tableData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) => (
                    <tr key={`row${index}`} className="hover:bg-gray-50">
                      {titles?.map((item: any, index: number) => {
                        if (
                          !colFiltrosAplicados ||
                          (colFiltrosAplicados &&
                            !getOcultarColumn(
                              item?.key,
                              colFiltrosAplicados,
                              colFilters
                            ))
                        ) {
                          return (
                            <td
                              key={index}
                              className={`border-b py-1 px-[10px] text-sm text-gray-900 justify-center ${
                                item?.contentClassName || item?.className
                              }`}
                              title={row?.[item?.key]}
                            >
                              <div
                                className={`flex ${
                                  item?.copyPosition === "bottom"
                                    ? "flex-col"
                                    : "flex-row"
                                }`}
                                style={{ justifyContent: "inherit" }}
                              >
                                {item?.enableCopy &&
                                  item?.copyPosition === "left" && (
                                    <button className="copy-button">
                                      Copy
                                    </button>
                                  )}
                                <span className="line-clamp-1 ">
                                  {row?.[item?.key]}
                                </span>
                                {item?.enableCopy &&
                                  (item?.copyPosition === "right" ||
                                    item?.copyPosition === "bottom" ||
                                    !item?.copyPosition) && (
                                    <button className="copy-button">
                                      Copy
                                    </button>
                                  )}
                              </div>
                            </td>
                          );
                        }
                        return null;
                      })}
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
      {!hiddePagination && (
        <ResponsivePagination
          rowsPerPageOptions={optionsPerPage}
          totalItems={tableData.length}
          initialRowsPerPage={rowsPerPage}
          initialPage={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

/**
 * ******************************************************************************
 *                                 CUSTOM  COMPONENT
 * ******************************************************************************
 *
 * Componente para copiar texto al portapapeles.
 *
 * @param children Contenido del botón.
 * @param text Texto a copiar al portapapeles.
 * @param title Título del botón (opcional).
 * @param position Posición del icono en relación al texto ("left" o "right", por defecto es "left").
 */

interface ButtonInterface {
  children?: ReactNode | string; //texto o componente a mostrar al lado del icono para copiar
  text: string; //retorna el objeto ya ordenado y agregado a las otras listas
  title?: string; //utilizado para mostar el texto al poner el mouse sobre el raton.
  position?: "left" | "right"; //posicion en caso de que exista texto o algun componente adicional
}

function CopyToClipboard({
  children,
  text,
  title,
  position = "left",
}: ButtonInterface) {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const copyToClipboardText = (e: any) => {
    e?.preventDefault();
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setToastMessage({ message: "Texto copiado!", type: "success" });
        setTimeout(() => {
          setCopied(false);
          setToastMessage(null);
        }, 2000);
      })
      .catch(() => {
        setToastMessage({ message: "Error al copiar", type: "error" });
      });
  };

  return (
    <div className="relative">
      <button
        className="btn-icon flex flex-col items-center leading-tight text-[9px] text-gray-500 font-light py-[2px] px-[2px] rounded-full hover:text-blue-800"
        onClick={copyToClipboardText}
        title={title || "Copiar al portapapeles"}
        disabled={copied}
      >
        {position === "left" && children}
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[15px] h-[15px] text-green-500"
          >
            <path d="M16.5 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3v-6A4.5 4.5 0 0 1 10.5 6h6Z" />
            <path d="M18 7.5a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3H18Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-[15px] h-[15px] text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
            />
          </svg>
        )}
        {position === "right" && children}
      </button>

      {toastMessage && (
        <Toast message={toastMessage.message} type={toastMessage.type} />
      )}
    </div>
  );
}
