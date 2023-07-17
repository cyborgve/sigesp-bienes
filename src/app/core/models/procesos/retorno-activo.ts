import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface RetornoActivo extends Basica {
  retorno: Id;
  activo: Id;
}
