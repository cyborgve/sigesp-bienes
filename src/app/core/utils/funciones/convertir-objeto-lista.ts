import { convertirCamelCaseATitulo } from './convertir-camel-case-a-titulo';

export const convertirObjetoLista = (objeto: any) => {
  if (objeto) {
    let objetoTransformado: typeof objeto = {};
    let claves = Object.keys(objeto);
    for (let clave of claves) {
      let claveTransformada = convertirCamelCaseATitulo(clave);
      objetoTransformado[claveTransformada] = objeto[clave];
    }
    return objetoTransformado;
  }
  return undefined;
};
