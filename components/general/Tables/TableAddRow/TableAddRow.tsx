import dayjs from "dayjs";
import React, { forwardRef, ReactNode, useImperativeHandle } from "react";
import { TableTitles } from "../interfaces/TitulosTablas";

/** Funcion para mostrar listas de datos en forma de tabla. Con la opcion de crear nueva fila para un nuevo registro.
 * El boton Guardar se muestra al final de cada tabla, se pueden editar los datos directamente desde la fila. Los datos
 * no son guardados en la base de datos
 *
 * @param children Se envia como hijo la Fila a Mostrar en forma de funcion que recibe ()
 * @param headers Array con los titulos de la tabla
 * @param setlocdata Funcion para modificar el elemento
 * @param locdata Lista con la data
 * @param newEmptyRegistro Estructura de un registro vacio, junto a los campos por defectos de los mismos
 * @param addNewText Texto a mostrar en el boton de agregar nuevo registro
 * @param moreOptions En caso de que se desee agregar algo adicional a agregar nuevo
 * @param styles Estilos generales para ser aplicados en la tabla
 *
 * @return lista de datos con opcion de agregar una nueva fila como dato. El metodo de guardado es para toda la tabla no por componente
 *
 */

export interface StylesTAdRInterface {
  button: any;
  thead: any;
}

interface EventRepInterface {
  target: {
    name: string;
    value: any;
  };
}

interface TableInterface {
  children: Function; //Se envia como hijo la Fila a Mostrar en forma de funcion que recibe ()
  headers: TableTitles[]; //Array con los titulos de la tabla
  setlocdata: Function; //Funcion para modificar el elemento
  locdata: any; //Lista con la data
  newEmptyRegistro?: any; //Registro vacio
  addNewText?: string; //Texto a mostrar en el boton de agregar nuevo registro
  moreOptions?: ReactNode; //En caso de que se desee agregar algo adicional a agregar nuevo
  styles?: StylesTAdRInterface; //Estilos generales para ser aplicados en la tabla
  hiddeOnEmptyTable?: boolean;
  showEmptyMessage?: boolean;
  emptyMessage?: string;
}

export interface TableAddHandleRef {
  pruneData(): any[];
}

const TableAddRow = forwardRef<TableAddHandleRef, TableInterface>(
  (
    {
      children,
      headers,
      setlocdata,
      locdata,
      newEmptyRegistro,
      addNewText = "AGREGAR NUEVO",
      moreOptions,
      styles,
      hiddeOnEmptyTable = true,
      showEmptyMessage = true,
      emptyMessage
    }: TableInterface,
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      pruneData() {
        return locdata.filter(
          (r:any) => JSON.stringify(r) !== JSON.stringify(newEmptyRegistro)
        );
      },
    }));

    const onChange = (e: EventRepInterface | any, rowIndex: number) => {
      setlocdata(
        locdata?.map((item: any, index: number) => {
          if (index === rowIndex) {
            return {
              ...item,
              [e.target.name]: e.target.value,
              lastUpdate: dayjs(),
            };
          } else return item;
        })
      );
    };

    //Funcion para eliminar una fila de la lista de exámenes
    function onDelete(e: React.MouseEvent<HTMLElement>, rowIndex: number) {
      e?.preventDefault();
      setlocdata(
        locdata.filter((item: any, index: number) => {
          return index !== rowIndex;
        })
      );
    }

    return (
      <div className="w-full h-full flex flex-col">
        {locdata?.length <= 0 && showEmptyMessage && (
          <div className="flex flex-col text-start text-gray-600 font-medium px-2 text-[12px]">
            {emptyMessage || "No tiene registros asignados a esta sección aún."}
          </div>
        )}
        {(locdata?.length > 0 || !hiddeOnEmptyTable) && (
          <>
            <table className="w-full text-xs text-left text-gray-500">
              <thead
                className="w-full uppercase text-center font-bold "
                style={{ ...styles?.thead }}
              >
                <tr className="border-b border-t border-x">
                  {headers?.map((item: any, index: number) => {
                    return (
                      <th
                        className={
                          "p-[3px] text-center font-bold leading-[13px] " +
                          item?.className
                        }
                        key={index}
                        title={item?.label}
                      >
                        <div
                          className="whitespace-pre-line leading-tight text-[10px]"
                          title={item?.label}
                        >
                          {item?.label}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody style={{ verticalAlign: "text-top" }}>
                {locdata &&
                  Array.isArray(locdata) &&
                  locdata?.map((item, i) => {
                    return children(item, onChange, onDelete, i);
                  })}
              </tbody>
            </table>
          </>
        )}
        <div className="fac-body mb-1">
          <div
            className="py-1 text-[9px] px-1 w-full bg-blue-gray-50 inline-flex "
            style={{ ...styles?.button }}
          >
            <div
              className="w-fit cursor-pointer inline-flex items-center"
              onClick={(e) => {
                if (Array.isArray(locdata)) {
                  setlocdata([...locdata, newEmptyRegistro]);
                } else {
                  setlocdata([newEmptyRegistro]);
                }
              }}
            >
              <p
                className="uppercase  "
                style={{
                  textDecoration: "underline",
                  fontWeight: "500",
                  color: "green",
                  marginLeft: "1.5px",
                }}
              >
                {addNewText}
              </p>
            </div>
            {moreOptions}
          </div>
        </div>
      </div>
    );
  }
);

export default TableAddRow;
