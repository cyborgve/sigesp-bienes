import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { ActivoProceso } from '../auxiliares/activo-proceso';

export interface Reasignacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  responsablePrimario: Id;
  responsableUso: Id;
  sede: Id;
  fechaEntrega: Date;
  observaciones: string;
  activos: ActivoProceso[];
}
