import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Integracion extends Basica {
  comprobante: string;
  tipoProceso: string;
  activo: Id;
  aprobado: number;
  integrado: number;
  registrado: number;
}
