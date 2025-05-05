/**
 * Evitar que un input se envie cuando se aplasta enter.
 * @param {*} evento
 * @returns
 */
export function preventSend(evento:any) {
  if (evento.key === "Enter") {
    evento.preventDefault();
    return false;
  }
}

/**
 * Funcion para validar formulario vacios.
 * @param {*} param0
 * @returns
 */
export function validateEmptyForms({ data, seterrorsValidate, requiredModel }:any) {
  if (requiredModel && seterrorsValidate && data) {
    let isValid: boolean = true;
    const tempErrors: any = [];
    requiredModel?.map((val: any) => {
      if (data) {
        if (
          data?.[val?.label] === undefined ||
          data?.[val?.label]?.toString()?.trim() === "" ||
          data?.[val?.label] === val?.value
        ) {
          isValid = false;
          tempErrors.push(val?.label);
        }
      } else {
        tempErrors.push(val?.label);
      }
    });
    seterrorsValidate(tempErrors);
    return isValid;
  } else {
    return false;
  }
}

/**
 * Validar campos requeridos segun un esquema o modelo dado.
 * @param {*} param0
 * @returns
 */
export function validateRequiredFieldsAsObj({
  data,
  setEmptyfields,
  setAlert,
  requiredModel,
}: any) {
  if (requiredModel && data) {
    let isValid: boolean = true;
    const tempValidations: any = [];
    let tempAlert: string = "";
    const keys = Object.keys(requiredModel);
    keys?.map((val: any) => {
      if (requiredModel?.[val]?.required) {
        if (requiredModel?.[val]?.fields) {
          const tempObj = validateRequiredFieldsAsObj({
            data: data?.[val],
            requiredModel: requiredModel?.[val]?.fields,
          });
          if (tempObj?.errorsFields?.length > 0) {
            tempValidations.push(tempObj?.errorsFields);
          }
          if (tempObj?.alertMsg) {
            tempAlert += tempObj?.alertMsg;
          }
          isValid = isValid && tempObj?.valid;
        } else {
          if (
            data?.[val] === undefined ||
            data?.[val]?.toString()?.trim() === "" ||
            (requiredModel?.[val]?.emptyValue &&
              data?.[val] === requiredModel?.[val]?.emptyValue)
          ) {
            isValid = false;
            tempValidations.push(val);
            tempAlert += requiredModel?.[val]?.message + "\n";
          }
        }
      }
    });
    if (setEmptyfields) {
      setEmptyfields(tempValidations);
    }
    if (setAlert) {
      setAlert(tempAlert);
    }
    return {
      valid: isValid,
      alertMsg: tempAlert,
      errorsFields: tempValidations,
    };
  } else {
    return { valid: false, errorsFields: {} };
  }
}

/**
 * Actualiza un campo en un objeto de formulario, permitiendo actualizar valores anidados.
 *
 * @param name - Nombre del campo a actualizar. Puede ser una clave simple o una clave anidada separada por puntos (e.g., "direccion.calle").
 * @param value - Nuevo valor a asignar al campo.
 * @param setForm - Función para actualizar el estado del formulario.
 * @param form - Objeto actual del formulario que se actualizará.
 */
export const onChangeCustome = ({
  name,
  value,
  setForm,
  form,
}: {
  name: string;
  value: any;
  setForm: any;
  form: any;
}) => {
  const nestedKeys = name.split(".");
  const updatedData: any = { ...form };
  let nestedObj = updatedData;

  // Recorre los niveles anidados del objeto, creando los objetos intermedios si no existen
  for (let i = 0; i < nestedKeys.length - 1; i++) {
    const key = nestedKeys[i];
    nestedObj[key] = nestedObj[key] || {};
    nestedObj = nestedObj[key];
  }

  // Asigna el valor al último nivel del objeto
  const finalKey = nestedKeys[nestedKeys.length - 1];
  nestedObj[finalKey] = value;

  // Actualiza el estado del formulario
  setForm(updatedData);
};


/**
 * Valida los campos obligatorios de una solicitud de cirugía.
 * 
 * Esta función recibe una solicitud parcial y verifica si los campos obligatorios 
 * están presentes y cumplen con las condiciones necesarias. Los campos que no cumplen 
 * con las reglas de validación son añadidos a la lista `camposFaltantes`.
 * 
 * Reglas de validación:
 * - Si el campo es `undefined` o `null`, se marca como faltante.
 * - Si el campo es una cadena vacía, se marca como faltante.
 * - Si el campo es un número negativo, se marca como faltante.
 * - Si el campo es un array, debe tener al menos el número mínimo de elementos especificado.
 * - Si el campo es un objeto, debe contener al menos un valor válido (no vacío ni `undefined`).
 * 
 * @param solicitud - El objeto de solicitud que contiene los datos a validar.
 * @param camposObligatorios - Un arreglo con las rutas de los campos obligatorios a validar.
 * @param camposMinimos - Un objeto que define el número mínimo de elementos por campo.
 * 
 * @returns Un objeto con:
 *   - `valido`: `true` si todos los campos son válidos, `false` si alguno es inválido.
 *   - `camposFaltantes`: Un arreglo con las rutas de los campos que no cumplen con las validaciones.
 */
export function validarCamposObligatorios(
  solicitud: any | undefined,
  camposObligatorios: string[],
  camposMinimos: { [key: string]: number } = {} // Objeto con los mínimos por campo
): { valido: boolean; camposFaltantes: string[] } {
  if (!solicitud) return { valido: false, camposFaltantes: [] };

  const camposFaltantes: string[] = [];

  const isValid = camposObligatorios.every((path) => {
    const value: any = path
      .split(".")
      .reduce((obj, key) => obj?.[key], solicitud);
    const minimo = camposMinimos[path]; // Obtener el mínimo para ese campo

    if (value === undefined || value === null) {
      camposFaltantes.push(path);
      return false;
    }

    // Verificar si el valor es una cadena vacía
    if (typeof value === "string" && value.trim() === "") {
      camposFaltantes.push(path);
      return false;
    }

    // Verificar si el valor es un número negativo
    if (typeof value === "number" && value < 0) {
      camposFaltantes.push(path);
      return false;
    }

    // Verificar si el valor es un array vacío, y si es obligatorio, verificar el mínimo
    if (Array.isArray(value)) {
      if (
        value.length === 0 ||
        (minimo !== undefined && value.length < minimo)
      ) {
        camposFaltantes.push(path);
        return false;
      }
    }

    // Verificar si el valor es un objeto vacío o solo contiene valores vacíos
    if (
      typeof value === "object" &&
      !Object.values(value).some(
        (val) =>
          val !== undefined &&
          val !== null &&
          !(typeof val === "string" && val.trim() === "")
      )
    ) {
      camposFaltantes.push(path);
      return false;
    }

    return true;
  });

  return { valido: isValid, camposFaltantes };
}


export const handleKeyDown = (event: any) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevenir el comportamiento por defecto de Enter

    const form = event.currentTarget.form;
    const focusableElements = form ? Array.from(form.elements) : [];
    const focusable = focusableElements.filter((el: any) => 
      el.tagName !== 'FIELDSET' && 
      !el.disabled && 
      !['hidden', 'submit', 'reset', 'button', "checkbox", "radio"].includes(el.type)
    );

    const index = focusable.indexOf(event.target);
  const nextElement = focusable[index + 1] as HTMLElement | null;
    if (nextElement) {
      nextElement.focus();
    }
  }
};