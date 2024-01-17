import { Id } from '@core/types/id';
import { ActivoProceso } from './activo-proceso';

export interface ActivoProcesoReasignacion extends ActivoProceso {
  responsableAnterior: Id;
  responsableUsoAnterior: Id;
}
