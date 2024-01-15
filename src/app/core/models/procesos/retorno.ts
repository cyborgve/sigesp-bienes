import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { TipoProceso } from '@core/types/tipo-proceso';
import { ActivoProcesoRetorno } from '../auxiliares/activo-proceso-retorno';

export interface Retorno extends Basica {
  comprobante: Id;
  beneficiario: Id;
  tipoComprobante: TipoProceso;
  observaciones: string;
  activos: ActivoProcesoRetorno[];
}
