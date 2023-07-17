import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface IncorporacionActivo extends Basica {
  incorporacion: Id;
  activo: Id;
}
