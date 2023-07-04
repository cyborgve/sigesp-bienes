import { Id } from '@core/types/id';
import { Basica } from './basica';
import { Codigo } from '@core/types/codigo';

export interface Ciudad extends Basica {
  paisId: Id;
  estadoId: Id;
  codigo: Codigo;
  denominacion: string;
}
