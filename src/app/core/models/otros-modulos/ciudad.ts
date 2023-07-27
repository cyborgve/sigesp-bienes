import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Ciudad extends Basica {
  paisId: Id;
  estadoId: Id;
  codigo: string;
  denominacion: string;
}
