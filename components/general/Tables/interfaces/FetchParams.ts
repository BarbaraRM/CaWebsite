/**
 * Interfaz para los titulos de los componentes de tablas
 */
export interface TableTitles {
    label:string; //palabra que se mostrara en el titulo de la tabla
    key?:string; //palabra clave para reconocerla en las row, de preferencia camel case
    align?: 'center' | 'right' | 'left'; //posicion para alinear el texto en la tabla
    className?: string; //stylos en tailwind o identificador de className para css. Si se necesita algun campo de importancia poner !
    sticky?:boolean; //para saber si el titulo sera estatico dentro de la tabla en caso que sea muy larga a lo horizontal.
    position?:string; //coordenadas para ubicar la celda. Se calcula sumando las medidas de las celdas anteriores.
    permisos?:string[] //array con permisos para mostrar u ocultar la celda. solo admin["admin"], cualquier persona ["*"]. si no tine permisos por defecto es publico.
}