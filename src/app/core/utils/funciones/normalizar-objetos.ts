import { convertirCamelCase } from './convertir-camel-case';

/**
 * @description  Transforma un objeto que puede tener los nombres de las propiedades con estilo snake_case y
 * lo retorna con los nombres de las propiedades en estilo camelCase. Necesario para mantener los estandares
 * entre el frontend que usa estilo camelCase y el backend que usa estilo snake_case.
 * @param objeto La entidad con los nombres de propiedades en estilo snake_case.
 * @returns objetoTransformado La entidad transformada con los nombres de propiedades en estilo camelCase.
 */
export function normalizarObjeto(objeto: any): any {
  if (objeto) {
    let objetoTransformado: typeof objeto = {};
    let claves = Object.keys(objeto);
    for (let clave of claves) {
      let claveTransformada = convertirCamelCase(clave);
      objetoTransformado[claveTransformada] = objeto[clave];
    }
    return objetoTransformado;
  }
  return undefined;
}
