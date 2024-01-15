import { ActivoProceso } from './activo-proceso';

export interface ActivoProcesoRetorno extends ActivoProceso {
  documentoRelacionado: string;
}
