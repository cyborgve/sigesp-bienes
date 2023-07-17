import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Incorporacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  responsablePrimario: Id;
  responsableUso: Id;
  unidadAdministrativa: Id;
  sede: Id;
  fechaEntrega: Date;
  observaciones: string;
  activos: Id[];
}
