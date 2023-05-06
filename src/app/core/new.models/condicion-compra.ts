import { Basica } from './basica';

export interface CondicionCompra extends Basica {
  idEmpresa: string;
  codigoCondicionCompra: string;
  denominacion: string;
  explicacion: string;
}
