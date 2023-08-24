import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { ActivoProceso } from '../auxiliares/activo-proceso';

export interface Incorporacion extends Basica {
  comprobante: Id;
  causaMovimiento: any;
  responsablePrimario: Id;
  responsableUso: Id;
  unidadAdministrativa: any;
  sede: any;
  fechaEntrega: Date;
  observaciones: string;
  activos: ActivoProceso[];
}
