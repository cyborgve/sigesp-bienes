import { Basica } from '../auxiliares/basica';

export interface Integracion extends Basica {
  comprobante: string;
  tipoProceso: string;
  activo: string;
}
