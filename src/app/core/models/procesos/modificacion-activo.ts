import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface ModificacionActivo extends Basica {
  modificacion: Id;
  activo: Id;
}
