import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { ActivoProceso } from '../auxiliares/activo-proceso';
import { TipoProceso } from '@core/types/tipo-proceso';

export interface Retorno extends Basica {
  comprobante: Id;
  beneficiario: Id;
  tipoComprobante: TipoProceso;
  observaciones: string;
  activos: ActivoProceso[];
}
