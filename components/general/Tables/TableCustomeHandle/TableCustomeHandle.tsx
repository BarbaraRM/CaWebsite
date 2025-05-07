"use client";
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { TableTitles } from "../interfaces/FetchParams";
import SkeletonTabla from "../SklTable/SklTable";
import { getOcultarColumn } from "../helper/tableValidation";
import { Bounce, toast } from "react-toastify";
import ShortPagination from "../TablePagination/ShortPagination";
import { getDataCustomeHandle } from "../helper/defaultFetch";

/**
 * Interfaz para los parámetros de paginación y filtros.
 * @interface FetchParamsInterface
 */
export interface FetchParamsInterface {
  page: number; // Número de página actual
  size: number; // Tamaño de la página (cantidad de registros por página)
  filters: { [key: string]: string[] }; // Objeto con los filtros aplicados
  textFilter: string; // Texto de búsqueda aplicado
}

/**
 * Propiedades de la tabla personalizada.
 * @interface TableInterface
 */
interface TableInterface {
  children?: Function; // Renderizado de la fila personalizada
  titles: TableTitles[]; // Lista de títulos de la tabla
  searchName?: string; // Nombre identificador del campo de búsqueda
  filtersToApply?: string[]; // Identificadores de los filtros a aplicar
  multiplicador?: number; // Cantidad inicial de registros por página
  rowsPerPageOptions?: number[]; // Opciones de cantidad de registros por página
  dataFetch?: Function; // Función de fetch para obtener los datos desde la base de datos
  especificFilters?: any; // Filtros específicos adicionales
  params?: any; // Parámetros adicionales para la función de fetch
  mobileViewType?: "table" | "list"; // Tipo de vista en móvil ('table' o 'list')
  customSkeleton?: ReactNode; // Componente Skeleton personalizado opcional
  api_url?: string | undefined; //Ruta en caso que se este trabajando con server-side, y no requiere personalizacion
  emptyDisplay?: ReactNode;
  onRowClick?: Function;
  isList?: boolean; //Para saber si es tabla o una lista nomas. Dependiendo de eso se muestran titulos y demas
  containerClassName?: string; //ClassName para el contenedor de las listas en caso de que no sea de tipo tabla
  fetchDefault?: boolean;
  newCard?: ReactNode;
  newRow?: ReactNode;
}

/**
 * Referencia expuesta por el componente TableCustomeHandle.
 * @interface TableCustomeHandleRef
 */
export interface TableCustomeHandleRef {
  refreshData(): void; // Función para refrescar los datos de la tabla
}

/**
 * Tipo para la referencia de la tabla personalizada.
 * @typedef TableCustomeRef
 */
export type TableCustomeRef = {
  refreshData(): void; // Función para actualizar la tabla
};

/**
 * Representa un filtro aplicado a la tabla.
 * @interface ItemsF
 */
export interface ItemsF {
  name: string; // Nombre del filtro
  value: string | string[]; // Valor del filtro aplicado
  hide?: "row" | "col" | "none"; // Indica si se oculta en fila, columna o no se oculta
}

/**
 * Estructura del resultado después de aplicar los filtros.
 * @interface ResultadoSeparado
 */
interface ResultadoSeparado {
  row: { [key: string]: string | string[] }; // Filtros aplicados por fila
  col: string[]; // Lista de columnas ocultas
}

/**
 * Valor inicial para la paginación.
 * @constant START_VALUE
 */
const START_VALUE = 0;

/**
 * ****************************************************************************
 *                                 MAIN COMPONENT
 * ****************************************************************************
 *
 * Tabla empleada para mostrar datos que retornen un objeto de tipo paginacion. Ver la seccion de documentacion TableCustomeHandle para comprender los diferentes objetos que envia y recibe.
 * La tabla recbe una funcion de tipo fetch la cual internamente llamara al instanciarse y tambien al moverse entre las paginas.
 * Internamente gestiona los eventos de filtros aplicados. Como son los filtros específicos de componentes de filtros, y tambien filtro segun campos del serch bar.
 * - Soporta vista en tabla o lista en dispositivos móviles.
 * - Gestiona filtros de columnas y búsqueda en los datos.
 * - Permite personalizar los skeletons de carga.
 *
 * @param {TableInterface} props - Propiedades del componente.
 * @param {ReactNode} props.children - Renderizado personalizado de filas.
 * @param {Array} props.titles - Títulos de las columnas.
 * @param {Function} props.dataFetch - Función para obtener los datos.
 * @param {string} props.searchName - Nombre del parámetro de búsqueda.
 * @param {Array} props.filtersToApply - Filtros que se aplicarán.
 * @param {number} [props.multiplicador=25] - Cantidad de registros por página.
 * @param {Array} [props.rowsPerPageOptions=[25,50,100]] - Opciones de registros por página.
 * @param {Object} [props.params] - Parámetros adicionales para la consulta.
 * @param {string} [props.mobileViewType='table'] - Tipo de vista en móvil ('table' o 'list').
 * @param {ReactNode} [props.customSkeleton] - Skeleton personalizado opcional.
 *
 * @returns {JSX.Element} Componente de tabla con paginación.
 */

const TableCustomeHandle = forwardRef<TableCustomeHandleRef, TableInterface>(
  (
    {
      children,
      titles,
      dataFetch,
      searchName,
      filtersToApply,
      multiplicador = 25,
      rowsPerPageOptions = [25, 50, 100],
      params,
      mobileViewType = "table", // 'table' o 'list'
      customSkeleton, // Componente Skeleton personalizado
      api_url,
      onRowClick,
      emptyDisplay,
      isList,
      containerClassName,
      fetchDefault,
      newCard,
      newRow,
    }: TableInterface,
    ref
  ) => {
    const [colFilters, setColFilters] = useState<string[]>();
    const [colFiltrosAplicados, setColFiltrosAplicados] = useState(false);
    const [skip, setSkip] = useState<number>(START_VALUE);

    const [tableData, settableData] = useState<any>();
    const [searching, setSearching] = useState<boolean>(true);
    const [nextPage, setNextPage] = useState<boolean>(false);
    const [previousPage, setPreviousPage] = useState<boolean>(false);
    const [registerPerPage, setRegisterPerPage] =
      useState<number>(multiplicador);
    const [optionsPerPage, setOptionsPerPage] = useState<number[]>(
      multiplicador && !rowsPerPageOptions.includes(multiplicador)
        ? [multiplicador, ...rowsPerPageOptions].sort((a, b) => a - b)
        : rowsPerPageOptions
    );
    const [shouldFetch, setShouldFetch] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
      refreshData() {
        fetchData(START_VALUE);
      },
    }));

    const handlePageChange = (newSkip: number) => {
      setShouldFetch(true);
      setSkip(newSkip);
    };

    const fetchData = async (newSkip?: number) => {
      try {
        setSearching(true);
        const reducedObject = filtersToApply?.reduce(
          (acc: ResultadoSeparado, filterName: string) => {
            const filterResult = buscarFiltrosAlmacenadosSS(
              `pag_filter${filterName}`
            );
            acc.row = { ...acc.row, ...filterResult.row };
            acc.col = [...acc.col, ...filterResult.col];
            return acc;
          },
          { row: {}, col: [] } as ResultadoSeparado
        );

        if (reducedObject?.col) {
          setColFilters(reducedObject?.col);
        }

        let SSFilterText: any = sessionStorage.getItem(
          `pag_table_searchTxt${searchName}`
        );

        let searchInputTemp: string = SSFilterText
          ? JSON.parse(SSFilterText)
          : "";

        let filtersForFetch = reducedObject?.row
          ? { ...reducedObject?.row }
          : {};
        if (params?.filters) {
          filtersForFetch = { ...filtersForFetch, ...params?.filters };
        }

        const fetchFunction = api_url ? getDataCustomeHandle : dataFetch;
        if (!fetchFunction) {
          alert("Se necesita un funcion de tipo FETCH");
          throw new Error("FETCH FUNCTION NEEDED");
        }
        await fetchFunction({
          skip: newSkip ?? skip,
          limit: skip + registerPerPage,
          filters: filtersForFetch,
          textFilter: searchInputTemp,
          params: params,
          ...(api_url ? { api_url } : {}), // Solo agrega api_url si existe
        })
          .then((resp: any) => {
            if (resp) {
              console.log("response data", resp);
              // settableData(data);
              settableData(resp?.data || []);
              setSkip(resp?.skip ?? 0);
              setNextPage(resp?.next_page ?? false);
              setPreviousPage(resp?.previous_page ?? false);
            } else {
              settableData([]);
              setNextPage(false);
              setPreviousPage(false);
            }
          })
          .finally(() => {
            setSearching(false);
          });
      } catch (error) {
        console.error("Error fetching the data in table...", error);
        settableData([]);
      } finally {
        setSearching(false);
        setShouldFetch(true); // 🔥 Se asegura de restablecer shouldFetch después de cada fetch
      }
    };

    const buscarFiltrosAlmacenadosSS = (filterName: string): any => {
      if (
        sessionStorage.getItem(`${filterName}`) &&
        sessionStorage.getItem(`${filterName}`) !== null
      ) {
        let filterTEmp: ItemsF[] = JSON.parse(
          sessionStorage.getItem(`${filterName}`) || ""
        );

        const resultado = filterTEmp.reduce<ResultadoSeparado>(
          (acc, { name, value, hide }) => {
            if (hide === "row") {
              acc.row[name] = value as string;
            } else if (hide === "col") {
              acc.col.push(name); // Aquí simplemente acumulamos los nombres de los elementos con hide="col"
            }
            return acc;
          },
          { row: {}, col: [] }
        );
        return resultado;
      } else {
        return {
          col: [],
          row: {},
        };
      }
    };

    const onChnagePerPage = (newLimit: number) => {
      setShouldFetch(true);
      setRegisterPerPage(newLimit);
      setSkip(START_VALUE);
    };

    useEffect(() => {
      if (shouldFetch) {
        fetchData().then(() => {
          setShouldFetch(true); // Restablece el estado solo después de que fetchData() finaliza
        });
      }
    }, [skip, registerPerPage]);

    useEffect(() => {
      const handleStorageEvent = () => {
        setShouldFetch(false); // Evita doble ejecución con useEffect
        setSkip(0);
        fetchData(0);
      };

      window.addEventListener(`pag_storage${searchName}`, handleStorageEvent);

      filtersToApply?.forEach((filterName: string) => {
        const handleFilterEvent = () => {
          setShouldFetch(false);
          setSkip(0);
          fetchData();
        };

        window.addEventListener(`pag_filter${filterName}`, handleFilterEvent);

        return () => {
          window.removeEventListener(
            `pag_filter${filterName}`,
            handleFilterEvent
          );
        };
      });

      return () => {
        window.removeEventListener(
          `pag_storage${searchName}`,
          handleStorageEvent
        );
      };
    }, []);

    useEffect(() => {
      if (!colFilters || (colFilters && colFilters?.length <= 0)) {
        setColFiltrosAplicados(false);
      } else {
        setColFiltrosAplicados(true);
      }
    }, [colFilters]);

    if (searching) {
      return customSkeleton ? customSkeleton : <SkeletonTabla />;
    }
    if (tableData?.length === 0 && emptyDisplay) {
      return emptyDisplay;
    } else {
      return (
        <>
          <div className="overflow-x-auto md:bg-white rounded-lg md:shadow flex-1">
            {mobileViewType === "list" && (
              <table className="md:hidden min-w-full divide-y divide-gray-200">
                <tbody className="space-y-2">
                  {newRow && <tr >{newRow}</tr>}
                  {tableData.map((row: any, index: number) =>
                    children ? (
                      children(row, index)
                    ) : (
                      <tr key={`esp${index}`}>
                        <td>
                          <div className="p-4 border rounded-lg shadow">
                            {titles?.map((item: any) => (
                              <div
                                key={item.key}
                                className="flex justify-between"
                              >
                                <span className="font-bold">
                                  {item?.label}:
                                </span>
                                <span>{row[item?.key]}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
            {isList && children && (
              <div className={containerClassName || "flex flex-col gap-y-1"}>
                {newCard && newCard}
                {tableData &&
                  tableData?.length > 0 &&
                  tableData?.map((row: any, index: number) =>
                    children(row, index)
                  )}
              </div>
            )}
            {!isList && (
              <table
                className={`min-w-full divide-y divide-gray-200 ${
                  mobileViewType === "list" ? "hidden md:table" : ""
                }`}
              >
                <thead className="bg-azure-900 sticky top-0">
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
                            key={`Cell-${index}`}
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
                            className={`px-2 py-1.5 text-center text-sm font-medium text-white normal-case leading-none tracking-wider ${item?.className} `}
                            align={item?.align}
                            title={item?.label}
                          >
                            {item?.label}
                          </th>
                        );
                      }
                      return "";
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newRow && <tr >{newRow}</tr>}

                  {children
                    ? tableData &&
                      tableData?.length > 0 &&
                      tableData?.map((row: any, index: number) =>
                        children(
                          row,
                          index,
                          colFiltrosAplicados ? colFilters : []
                        )
                      )
                    : tableData &&
                      tableData?.length > 0 &&
                      tableData?.map((row: any, index: number) => (
                        <tr
                          key={`row${index}`}
                          className={onRowClick ? "cursor-pointer" : ""}
                          onClick={() => {
                            if (onRowClick) {
                              onRowClick(row, index);
                            }
                          }}
                        >
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
                                  title={row?.[item?.key]}
                                  key={index}
                                  className={`border-b py-2 px-3 text-sm justify-center  ${
                                    item?.contentClassName || item?.className
                                  } `}
                                >
                                  <div
                                    title={row?.[item?.key]}
                                    className={`flex ${
                                      item?.copyPosition === "bottom"
                                        ? "flex-col"
                                        : "flex-row"
                                    }`}
                                    style={{ justifyContent: "inherit" }}
                                  >
                                    {item?.enableCopy &&
                                      item?.copyPosition === "left" && (
                                        <CopyToclipboard
                                          text={row?.[item?.key]}
                                        />
                                      )}
                                    <span className="line-clamp-1">
                                      {row?.[item?.key]}
                                    </span>
                                    {item?.enableCopy &&
                                      (item?.copyPosition === "right" ||
                                        item?.copyPosition === "bottom" ||
                                        !item?.copyPosition) && (
                                        <CopyToclipboard
                                          text={row?.[item?.key]}
                                        />
                                      )}
                                  </div>
                                </td>
                              );
                            }
                            return "";
                          })}
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
          {(previousPage || nextPage) && (
            <ShortPagination
              skip={skip}
              multiplicador={registerPerPage}
              nextPage={nextPage}
              previousPage={previousPage}
              onPageChange={handlePageChange}
              optionsPerPage={optionsPerPage ?? [25, 50, 100]}
              onLimitChange={onChnagePerPage}
              registerPerPage={registerPerPage}
            />
          )}
        </>
      );
    }
  }
);

export default TableCustomeHandle;

/**
 * ******************************************************************************
 *                                 CUSTOM IMPORTABLE COMPONENT
 * ******************************************************************************
 *
 * Componente para crer un input de tipo busqueda. Funciona aislado de la tabla.
 * Funcionamiento: Cada vez que se cambia el texto en el input se almacena el valor en local storage y se genera un evento.
 * Resultado: Desde el lugar o componente que se desee se debe poner un addEventListener y dentro de la funcion lee la variable almacenada en local storage
 *
 * Evento Disparado: storage
 * Variable Local Storage:
 *
 * @param {string} param.placeholder
 * @returns
 */
export function SearchInputHandle({
  placeholder = "Search ...",
  eventName = "",
}: {
  placeholder?: string;
  eventName?: string;
}) {
  const [searchText, setSearchText] = useState("");

  const onhandleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const sendSearchEvent = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem(
      `pag_table_searchTxt${eventName}`,
      JSON.stringify(searchText)
    );
    window.dispatchEvent(new Event(`pag_storage${eventName}`));
  };

  useEffect(() => {
    if (searchText === "") {
      sessionStorage.setItem(
        `pag_table_searchTxt${eventName}`,
        JSON.stringify(searchText)
      );
      window.dispatchEvent(new Event(`pag_storage${eventName}`));
    }
  }, [searchText]);

  return (
    <form
      id="input_handle_search"
      className="w-full max-w-md min-w-[250px] flex md:min-w-[400px] h-fit"
      onSubmit={sendSearchEvent}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={searchText}
          onChange={onhandleChange}
          type="search"
          id="default-search"
          autoComplete="off"
          //className="shadow block w-full p-2 ps-10 pe-20 text-base sm:text-sm/6 text-gray-900 border border-gray-400 rounded bg-white focus:ring-blue-500 focus:border-blue-500"
          className={`block w-full rounded-md bg-white py-2 pl-10 pr-20 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6`}
          placeholder={placeholder}
        />
        {searchText && searchText !== "" && (
          <button
            type="submit"
            className="leading-tight text-white absolute end-1 bottom-1.5 bg-dark hover:bg-dark/6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1.5"
          >
            Buscar
          </button>
        )}
      </div>
    </form>
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

function CopyToclipboard({
  children,
  text,
  title,
  position = "left",
}: ButtonInterface) {
  const [copied, setCopied] = useState(false);

  const copyToClipboardText = (e: any) => {
    e?.preventDefault();
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast.success("Texto copiadio!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        setCopied(false);
        console.error("Something went wrong", err);
      });
  };
  return (
    <button
      className="btn-icon flex flex-col items-center leading-tight text-[9px] text-gray-500 font-light py-[2px] px-[2px] rounded-full hover:text-blue-800"
      onClick={copyToClipboardText}
      title={title || "Copiar al portapapeles"}
      style={{ color: copied ? "green" : "gray" }}
      disabled={copied}
    >
      {position === "left" && children}
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[15px] h-[15px] text-gray-300"
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
          className={`w-[15px] h-[15px] text-gray-600`}
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
  );
}
