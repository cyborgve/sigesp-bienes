import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { TipoProceso } from '@core/types/tipo-proceso';

export interface Integracion extends Basica {
  proceso: Id;
  procesoTipo: TipoProceso;
  procesoComprobante: string;
  activo: Id;
  aprobado: number;
  integrado: number;
  registrado: number;
}
