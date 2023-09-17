import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { ComponenteProceso } from '../auxiliares/componente-proceso';
import { CuentaContableProceso } from '../auxiliares/cuenta-contable-proceso';

export interface Modificacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  activo: Id;
  identificador: string;
  serial: string;
  observaciones: string;
  modificaciones: ComponenteProceso[];
  cuentasContables: CuentaContableProceso[];
}
