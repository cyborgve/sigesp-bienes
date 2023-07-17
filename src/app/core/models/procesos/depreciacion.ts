import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Depreciacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  unidadAdministrativa: Id;
  observaciones: string;
  activos: Id[];
}
