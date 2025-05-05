// utils/sanitizeSvg.ts
export function sanitizeSvg(svg: string): string {
    // Bloquea contenido si no comienza con una etiqueta <svg
    if (!svg.trim().startsWith("<svg")) return "";
  
    // Elimina cualquier etiqueta <script>
    let cleaned = svg.replace(/<script.*?>.*?<\/script>/gi, "");
  
    // Elimina atributos potencialmente peligrosos como onClick, onLoad, etc.
    cleaned = cleaned.replace(/on\w+="[^"]*"/gi, "");
  
    // Elimina cualquier "javascript:" en atributos
    cleaned = cleaned.replace(/javascript:/gi, "");
  
    // Elimina enlaces externos que podrían ser maliciosos
    cleaned = cleaned.replace(/xlink:href/gi, "data-xlink:href");
  
    return cleaned;
  }
  