/**
 * Comprueba si un valor es un objeto o una función (y no nulo).
 * @param val El valor que se va a comprobar.
 * @returns `true` si el valor es un objeto o una función (y no nulo), `false` en caso contrario.
 */
export function isObject(val:any) {
  if (val === null) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
}

/**
 * Formatea un número como moneda (dólar por defecto) con decimales personalizados
 * @param value número o string numérico
 * @param lang código de lenguaje (ej: 'es-EC', 'en-US')
 * @param currency tipo de moneda (ej: 'USD', 'EUR')
 * @param minimumFractionDigits cantidad mínima de decimales (default: 4)
 */
export const formatDollar = (
  value: number | string,
  minimumFractionDigits: number = 2,
  lang: string = 'en-US',
  currency: string = 'USD',
): string => {
  const numericValue = parseFloat(value as string);

  const safeValue = isNaN(numericValue) ? 0 : numericValue;

  return safeValue.toLocaleString(lang, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits,
  });
};


/**
 * Normaliza un valor y lo convierte en un nombre de campo de objeto válido.
 * @param value El valor que se va a normalizar y convertir.
 * @param param El parámetro opcional que se añadirá al inicio del nombre de campo.
 * @returns El nombre de campo de objeto resultante.
 */
export const objectFieldName = (value: any, param: string = "") => {
  const temp = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  temp?.replaceAll(/[^a-zA-Z0-9 \s]/g, "");
  return `${param}${temp}`;
};


/**
 * Determina si una lista es un array de strings.
 * @param lista La lista que se va a comprobar.
 * @returns `true` si la lista es un array de strings, `false` si es un array de objetos o está vacía.
 */
export function isArrayString(lista: string[] | any[]) {
  if (lista.length === 0) {
    return false; // La lista está vacía, por lo que no podemos determinar su tipo
  }
  if (typeof lista[0] === "string") {
    // Comprobamos si el primer elemento es un string
    return true; // Es un array de strings
  }
  if (typeof lista[0] === "object" && Object.keys(lista[0]).length > 0) {
    // Comprobamos si el primer elemento es un objeto y tiene propiedades
    return false; // Es un array de objetos
  }
  return true; // Si no es un string ni un objeto con propiedades, consideramos que es un array de strings
}

/**
 * recibe un valor y verifica su tipo utilizando typeof y Array.isArray().
 * Luego, devuelve una cadena que indica el tipo de la variable (string[], string, object[], o unknown si el tipo no coincide con ninguno de los anteriores)
 * @param {*} value
 * @returns
 */
export function checkType(value: any): string {
  if (typeof value === "string") {
    return "string";
  } else if (Array.isArray(value) && typeof value[0] === "string") {
    return "string[]";
  } else if (Array.isArray(value) && typeof value[0] === "object") {
    return "object[]";
  } else {
    return "unknown";
  }
}

/**
 * Necesario para validar si un objeto tiene campos
 */
export const hasSomeData = (obj: any):any => {
  if (obj === null || obj === undefined) return false;

  if (typeof obj === "string") {
    return obj.trim() !== "";
  }

  if (typeof obj === "boolean") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.some((item) => hasSomeData(item));
  }

  if (typeof obj === "object") {
    return Object.values(obj).some((value) => hasSomeData(value));
  }

  return false;
};

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The input string to be transformed.
 * @returns {string} - The transformed string with the first letter capitalized.
 *                      If the input is an empty string or undefined, it returns an empty string.
 */
export function capitalizeFirstLetter(str:string) {
  if (!str) return ""; // Verifica si el string es vacío o indefinido
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convierte la primera letra de cada palabra en mayúscula, y las demás letras en minúscula.
 *
 * @param {string} text - El texto que se va a modificar.
 * @returns {string} - El texto con la primera letra de cada palabra en mayúscula.
 */
export function capitalizeWords(text:string) {
  return text
    ?.split(" ") // Divide el texto en un arreglo de palabras usando el espacio como delimitador
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Convierte la primera letra de cada palabra a mayúscula y el resto a minúscula
    )
    .join(" "); // Une las palabras de nuevo en una sola cadena, separadas por espacios
}
