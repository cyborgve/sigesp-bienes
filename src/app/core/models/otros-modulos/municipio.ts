import { Codigo } from '@core/types/codigo';
import { Basica } from '../auxiliares/basica';
import { Id } from '@core/types/id';

export interface Municipio extends Basica {
  paisId: Id;
  estadoId: Id;
  codigo: Codigo;
  denominacion: string;
  capital: string;
}
