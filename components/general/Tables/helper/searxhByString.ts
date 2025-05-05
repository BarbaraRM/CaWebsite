interface DataObject {
  [key: string]: any;
}

function isObject(val: any): boolean {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function normalizeStr(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Reemplazo compatible de diacríticos
    .toLowerCase();
}

function checker(obj: any, keywords: string[]): boolean {
  const target = normalizeStr(JSON.stringify(Object.values(obj)));
  return keywords.every((keyword) => target.includes(keyword));
}

function checker2(obj: any, keywords: string[]): boolean {
  const target = normalizeStr(JSON.stringify(Object.values(obj)));
  return keywords.some((keyword) => target.includes(keyword));
}

/**
 * Realiza una búsqueda en una lista de objetos utilizando diferentes métodos de búsqueda.
 * @param snip El término de búsqueda.
 * @param tipobusqueda El tipo de búsqueda a realizar (0: exacta, 1: por palabra clave, 2: avanzada).
 * @param dataO La lista de objetos donde se busca.
 * @returns Un arreglo con los objetos que coinciden.
 */
export function searchMethod({
  snip = "",
  tipobusqueda,
  dataO,
}: {
  snip: string;
  tipobusqueda: number;
  dataO: DataObject | DataObject[];
}): DataObject[] {
  let snipsnap: string[] = [];
  let result: any[] = [];

  switch (tipobusqueda) {
    case 0: {
      const search = normalizeStr(snip);
      if (Array.isArray(dataO)) {
        result = dataO.filter((val) => {
          const valueStr = normalizeStr(JSON.stringify(Object.values(val)));
          return valueStr.includes(search);
        });
      } else {
        result = [dataO];
      }
      break;
    }

    case 1: {
      snipsnap = normalizeStr(snip).split(" ").filter((v) => v !== "");
      if (Array.isArray(dataO)) {
        result = dataO.filter((val) => snipsnap.length > 0 ? checker(val, snipsnap) : true);
      } else {
        result = [dataO];
      }
      break;
    }

    case 2: {
      snipsnap = normalizeStr(snip).split(" ").filter((v) => v !== "");
      if (Array.isArray(dataO)) {
        result = dataO.filter((val) => snipsnap.length > 0 ? checker2(val, snipsnap) : true);
      } else {
        result = [dataO];
      }
      break;
    }

    default:
      result = [];
  }

  return result;
}
