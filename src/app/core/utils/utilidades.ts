function convertirCamelCase(cadena: string): string {
  const palabras = cadena.split('_');
  const resultado = palabras.map((palabra, indice) =>
    indice === 0
      ? palabra.toLowerCase()
      : `${palabra.charAt(0).toUpperCase()}${palabra.slice(1).toLowerCase()}`
  );
  return resultado.join('');
}

function normalizarObjeto(objeto: any): any {
  let entidadTransformada: typeof objeto = {};
  let claves = Object.keys(objeto);
  for (let clave of claves) {
    let claveTransformada = convertirCamelCase(clave);
    entidadTransformada[claveTransformada] = objeto[clave];
  }
  return entidadTransformada;
}

/** @description Contiene funciones especificas para la manipulacion de datos
 * @author Richard Iribarren
 * @email richardiribarren@gmail.com
 */
export class Utilidades {
  /** @description Recibe una cadena con el nombre de una avariable,
   * usando como separador de palabras "_", y retorna la
   * misma cadena eliminando los separadores de palabra
   * y convirtiendola en camelCase.
   * @author Richard Iribarren
   * @email richardiribarren@gmail.com */
  static convertirCamelCase = (variable: string) =>
    convertirCamelCase(variable);

  /** @description Recibe un objeto que puede tener los nombres de las propiedades
   * separados con "_" y lo retorna con los nombres de las variables
   * en estilo camelCase.
   * @author Richard Iribarren
   * @email richardiribarren@gmail.com */
  static normalizarObjeto = (objeto: any) => normalizarObjeto(objeto);
}
