import { Basica } from './auxiliares/basica';

export interface CuentaContable extends Basica {
  codigo: string;
  denominacion: string;
}
