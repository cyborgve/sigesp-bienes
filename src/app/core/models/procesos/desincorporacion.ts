import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Desincorporacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  unidadAdministrativa: Id;
  observaciones: string;
  activos: Id[];
  total: number;
  cuentasContables: Id[];
  debe: number;
  haber: number;
  diferencia: number;
}
