
/**
 * Funcion para saber si una columna debe ser visible o debe estar oculta. Esto se utiliza para filtros.
 * @param cellKey //key de la celda
 * @param filtrosActivos  //Saber si los filtros estan activos o inactivos. Esto es para cuando se hacen tablas con filtros
 * @param includedKeys //Array con los key de las tablas que se deben incluir
 * @returns 
 */
export const getOcultarColumn = (cellKey:string, filtrosActivos:boolean, includedKeys:string[]|undefined) =>{
    let category = cellKey?.split("/").length > 1 ? cellKey?.split("/")?.[0] : "none" ;
    if(!filtrosActivos){
      return false;
    }else{
      if(category === "none"){
        return false;
      }else{
          if(includedKeys?.includes(cellKey)){
            return false;
          }else{
            return true;
          }      
      }
    }
}