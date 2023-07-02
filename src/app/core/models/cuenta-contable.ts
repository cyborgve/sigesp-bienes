import { Basica } from './basica';

export interface CuentaContable extends Basica {
  codigo: string;
  denominacion: string;
}
