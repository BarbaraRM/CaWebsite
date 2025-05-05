interface Filtro {
  [campo: string]: string[];
}

interface Objeto {
  [campo: string]: string;
}

/**
 * Determina si un objeto cumple con una lista de filtros.
 * @param objeto El objeto a evaluar.
 * @param filtros La lista de filtros a aplicar.
 * @param cumplirConTodos Indica si el objeto debe cumplir con todos los filtros (true) o al menos con uno (false).
 * @returns true si el objeto cumple con los filtros, false en caso contrario.
 */
function cumpleConFiltros(objeto: Objeto, filtros: Filtro[], cumplirConTodos: boolean): boolean {
  return cumplirConTodos
    ? filtros.every(filtro =>
        Object.keys(filtro).every(campo => {
          const valor = objeto[campo];
          if (Array.isArray(valor)) {
            return filtro[campo].some(opcion => valor.includes(opcion));
          } else if (typeof valor === 'string') {
            return filtro[campo].includes(valor);
          } else {
            return false;
          }
        })
      )
    : filtros.some(filtro =>
        Object.keys(filtro).some(campo => {
          const valor = objeto[campo];
          if (Array.isArray(valor)) {
            return filtro[campo].some(opcion => valor.includes(opcion));
          } else if (typeof valor === 'string') {
            return filtro[campo].includes(valor);
          } else {
            return false;
          }
        })
      );
}

/**
 * Filtra una lista de objetos según una lista de filtros y un criterio de cumplimiento.
 * @param objetos La lista de objetos a filtrar.
 * @param filtros La lista de filtros a aplicar.
 * @param cumplirConTodos Indica si los objetos deben cumplir con todos los filtros (true) o al menos con uno (false).
 * @returns Una lista de objetos filtrados.
 */
export function filtrarObjetos(objetos: Objeto[], filtros: Filtro[], cumplirConTodos: boolean): Objeto[] {
  return objetos.filter(objeto =>
    cumpleConFiltros(objeto, filtros, cumplirConTodos)
  );
}
