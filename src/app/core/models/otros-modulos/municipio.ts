import { Basica } from '../auxiliares/basica';
import { Id } from '@core/types/id';

export interface Municipio extends Basica {
  paisId: Id;
  estadoId: Id;
  codigo: string;
  denominacion: string;
  capital: string;
}
