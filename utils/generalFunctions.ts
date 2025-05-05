/**
 * Funcion para saber si se esta trabajando sobre el ambiente de desarrollo o produccion.
 * Se realiza una comparacion con los API para saber a que servidor apuntan los endpoints.
 * @param {*} ApiIP IP del microservicio, se envia el obtenido del archivo .env
 * @returns Mensaje
 */
export const getEnv = (ApiIP: string) => {
  if (process.env.NODE_ENV === "production") {
    if (ApiIP?.includes(".252:") || ApiIP?.includes(".10:")) {
      return "CUIDADO, TRABAJANDO SOBRE VARIABLES DE PRUEBA";
    } else {
      return "";
    }
  } else {
    return "AMBIENTE DE DESARROLLO";
  }
};

/**
 * Asynchronously copies text to the clipboard.
 * @param {string} text - The text to copy to the clipboard.
 * @returns {Promise<boolean>} A promise that resolves to true if the text was successfully copied, false otherwise.
 */
export const copyToClipboard = async (text: string) => {
  return navigator.clipboard.writeText(text);
};

/**
 * Convierte un objeto en un string de parámetros para usar en una solicitud fetch.
 * @param {Record<string, any> | undefined} objeto - El objeto con los parámetros (opcional).
 * @param {string | undefined} [textFilter] - El valor para el parámetro 'all' (opcional).
 * @returns {string} El string de parámetros.
 */
export function objetoAParametrosFetch(
  objeto: Record<string, any> | undefined,
  textFilter: string | undefined
) {
  const parametros = new URLSearchParams();

  // Verificar si el objeto no es undefined ni null y no está vacío
  if (objeto && Object.keys(objeto).length > 0) {
    for (const key in objeto) {
      if (objeto[key] && objeto[key] != "") {
        parametros.append(key, objeto[key]);
      }
    }
  }

  // Agregar textFilter si está presente
  if (textFilter) {
    parametros.append("all", textFilter);
  }

  return parametros.toString();
}

/**
 * Evitar que un input se envie cuando se aplasta enter.
 * @param {*} evento
 * @returns
 */
export function preventSend(evento: any) {
  if (evento.key === "Enter") {
    evento.preventDefault();
    return false;
  }
}

export const handleIntegerKeyDown = (e: any) => {
  // Permitir teclas de control como backspace, delete, tab, etc.
  if (
    e.key === "Backspace" ||
    e.key === "Tab" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown"
  ) {
    return;
  }

  // Permitir solo números
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};

export const isEmptyObject = (obj: Record<string, any> | undefined) => {
  if (!obj || Object.keys(obj).length === 0) {
    return true;
  }

  return Object.values(obj).every((value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    if (typeof value === "string") {
      return value.trim() === "";
    }
    return value === undefined;
  });
};
