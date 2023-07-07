import { Id } from '@core/types/id';
import { Codigo } from '@core/types/codigo';
import { Basica } from './auxiliares/basica';

export interface Ciudad extends Basica {
  paisId: Id;
  estadoId: Id;
  codigo: Codigo;
  denominacion: string;
}
