import dayjs from 'dayjs';

/**
 * Función para comparar si dos valores representan el mismo día.
 * @param {string | Date | dayjs.Dayjs} day1 - Primer día a comparar.
 * @param {string | Date | dayjs.Dayjs} day2 - Segundo día a comparar.
 * @returns boolean
 */
export function isSameDay(
  day1: string | Date | dayjs.Dayjs = dayjs(),
  day2: string | Date | dayjs.Dayjs = dayjs()
): boolean {
  const d1 = dayjs(day1);
  const d2 = dayjs(day2);
  return d1.isSame(d2, 'day'); // ya compara día, mes y año automáticamente
}

/**
 * Función para dar formato a una fecha con valor por defecto en caso de error.
 * @param {string} fecha - String con la fecha.
 * @param {string} formato - Formato deseado (por defecto: DD/MM/YYYY).
 * @param {string} defaultValue - Valor por defecto si la fecha es inválida.
 * @returns string
 */
export function formatoFecha({
  fecha,
  formato = 'DD/MM/YYYY',
  defaultValue = '',
}: {
  fecha: string;
  formato?: string;
  defaultValue?: string;
}): string {
  const parsed = dayjs(fecha);
  return parsed.isValid() ? parsed.format(formato) : defaultValue;
}
