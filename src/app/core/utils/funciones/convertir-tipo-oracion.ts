/**
 * @description Recibe una cadena de texto y la retorna transformada en minusculas con la primera letra mayuscula.
 * @param texto string
 * @returns string
 * @example 'La Fria MADRUGADA' => 'La fria madrugada'
 */
export const convertirTipoOracion = (texto: string) => {
  return (
    texto.charAt(0).toLocaleUpperCase() + texto.substring(1).toLocaleLowerCase()
  );
};
