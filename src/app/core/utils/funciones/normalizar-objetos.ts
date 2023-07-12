import { convertirCamelCase } from './convertir-camel-case';

/** @description Recibe un objeto que puede tener los nombres de las propiedades
 * separados con "_" y lo retorna con los nombres de las variables
 * en estilo camelCase. */
export function normalizarObjeto(objeto: any): any {
  let entidadTransformada: typeof objeto = {};
  let claves = Object.keys(objeto);
  for (let clave of claves) {
    let claveTransformada = convertirCamelCase(clave);
    entidadTransformada[claveTransformada] = objeto[clave];
  }
  return entidadTransformada;
}
