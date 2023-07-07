import { Id } from '@core/types/id';
import { Basica } from './auxiliares/basica';

export interface ActivoComponente extends Basica {
  activoId: Id;
  denominacion: string;
  especificaciones: string;
  tipo: Id;
  marcaId: Id;
  modeloId: Id;
}
