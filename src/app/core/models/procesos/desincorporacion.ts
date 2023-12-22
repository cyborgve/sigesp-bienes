import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { ActivoProceso } from '../auxiliares/activo-proceso';
import { CuentaContableProceso } from '../auxiliares/cuenta-contable-proceso';
import { DesincorporacionUbicacion } from '../auxiliares/desincorporacion-ubicacion';

export interface Desincorporacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  unidadAdministrativa: Id;
  observaciones: string;
  activos: ActivoProceso[];
  ubicaciones: DesincorporacionUbicacion[];
  total: number;
  cuentasContables: CuentaContableProceso[];
  debe: number;
  haber: number;
  diferencia: number;
}
