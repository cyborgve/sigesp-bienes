import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface CambioResponsableActivo extends Basica {
  cambioResponsable: Id;
  activo: Id;
}
