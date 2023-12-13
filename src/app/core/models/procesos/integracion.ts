import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Integracion extends Basica {
  tipo: string;
  comprobante: string;
  activo: Id;
}
