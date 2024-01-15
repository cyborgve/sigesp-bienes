import { Id } from '@core/types/id';
import { Basica } from './basica';
import { TipoProceso } from '@core/types/tipo-proceso';

export interface RetornoLista extends Basica {
  comprobante: Id;
  beneficiario: string;
  tipoRetorno: TipoProceso;
  observaciones: string;
}
