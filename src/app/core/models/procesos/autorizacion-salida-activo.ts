import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface AutorizacionSalidaActivo extends Basica {
  autorizacionSalida: Id;
  activo: Id;
}
