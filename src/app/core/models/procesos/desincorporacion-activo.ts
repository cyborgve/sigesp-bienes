import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface DesincorporacionActivo extends Basica {
  desincorporacion: Id;
  activo: Id;
}
