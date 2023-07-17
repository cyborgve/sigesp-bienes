import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Modificacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  activo: Id;
  identificador: string;
  observaciones: string;
  modificaciones: Id[];
  cuentasContables: Id[];
}
