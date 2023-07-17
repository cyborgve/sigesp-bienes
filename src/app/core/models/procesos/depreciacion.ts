import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { DepreciacionActivo } from './depreciacion-activo';

export interface Depreciacion extends Basica {
  comprobante: Id;
  observaciones: string;
  depreciacionActivos: DepreciacionActivo[];
}
