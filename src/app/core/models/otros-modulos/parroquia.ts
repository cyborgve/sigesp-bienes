import { Codigo } from '@core/types/codigo';
import { Basica } from '../auxiliares/basica';
import { Id } from '@core/types/id';

export interface Parroquia extends Basica {
  codigo: Codigo;
  denominacion: string;
  paisId: Id;
  estadoId: Id;
  municipioId: Id;
}
