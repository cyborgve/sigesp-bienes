import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface ReasignacionActivo extends Basica {
  reasignacion: Id;
  activo: Id;
}
