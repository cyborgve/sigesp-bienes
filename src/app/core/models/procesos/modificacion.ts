import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Modificacion extends Basica {
  comprobante: Id;
  causaMovimiento: Id;
  activo: Id;
  identificador: string;
  serial: string;
  observaciones: string;
  modificaciones: ModificacionActivo[];
  cuentasContables: ModificacionCuentaContable[];
}

export interface ModificacionActivo extends Basica {
  modificacion: Id;
  activo: Id;
}

export interface ModificacionCuentaContable extends Basica {
  modificacion: Id;
  cuentaContable: Id;
}
