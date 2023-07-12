/**
 * @description Recibe una cadena con el nombre de una avariable,
 * usando como separador de palabras "_", y retorna la
 * misma cadena eliminando los separadores de palabra
 * y convirtiendola en camelCase.
 * @param string // Nombre de variable con estilo base de dato ej: variable_ejemplo
 * @returns string // Nombre de variable */
export function convertirCamelCase(cadena: string): string {
  const palabras = cadena.split('_');
  const resultado = palabras.map((palabra, indice) =>
    indice === 0
      ? palabra.toLowerCase()
      : `${palabra.charAt(0).toUpperCase()}${palabra.slice(1).toLowerCase()}`
  );
  return resultado.join('');
}
