import { ActivoProceso } from './activo-proceso';

export interface ActivoMigrado extends ActivoProceso {
  generar: boolean;
}
