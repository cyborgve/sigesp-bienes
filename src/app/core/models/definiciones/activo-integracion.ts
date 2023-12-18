import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface ActivoIntegracion extends Basica {
  activoId: Id;
  modCuentaContableDebe: Id;
  modCuentaContableHaber: Id;
  desCuentaContableDebe: Id;
  desCuentaContableHaber: Id;
}
