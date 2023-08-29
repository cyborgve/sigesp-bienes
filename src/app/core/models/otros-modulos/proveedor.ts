import { Basica } from '../auxiliares/basica';

export interface Proveedor extends Basica {
  rif: string;
  denominacion: string;
}
