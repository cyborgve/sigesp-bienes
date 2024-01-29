import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { TipoProceso } from '@core/types/tipo-proceso';

export interface Integracion extends Basica {
  comprobante: string;
  tipoProceso: TipoProceso;
  activo: Id;
  aprobado: number;
  integrado: number;
  registrado: number;
}
