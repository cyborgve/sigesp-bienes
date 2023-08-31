import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { ActivoProceso } from '../auxiliares/activo-proceso';

export interface Desincorporacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  unidadAdministrativa: Id;
  observaciones: string;
  activos: ActivoProceso[];
  total: number;
  cuentasContables: Id[];
  debe: number;
  haber: number;
  diferencia: number;
}
