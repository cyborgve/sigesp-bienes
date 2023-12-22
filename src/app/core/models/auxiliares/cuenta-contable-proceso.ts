import { Id } from '@core/types/id';
import { Basica } from './basica';

export interface CuentaContableProceso extends Basica {
  proceso: Id;
  cuentaContable: Id;
  denominacion: String;
  procedencia: 'D' | 'H';
  monto: number;
}
