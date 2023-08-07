/**
 * @description Tranforma una cadena de texto que pordia estar en estilo snake_case a estilo camelCase.
 * @param string // Nombre de variable con estilo base de dato ej: variable_ejemplo
 * @returns string // Nombre de variable */
export function convertirCamelCase(cadena_entrada: string): string {
  const palabras = cadena_entrada.split('_');
  const cadenaSalida = palabras.map((palabra, indice) =>
    indice === 0
      ? palabra.toLowerCase()
      : `${palabra.charAt(0).toUpperCase()}${palabra.slice(1).toLowerCase()}`
  );
  return cadenaSalida.join('');
}
