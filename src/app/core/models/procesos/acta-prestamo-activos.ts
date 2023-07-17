import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface ActaPrestamoActivo extends Basica {
  actaPrestamo: Id;
  activo: Id;
}
