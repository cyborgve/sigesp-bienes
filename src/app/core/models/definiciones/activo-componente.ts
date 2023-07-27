import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';

export interface ActivoComponente extends Basica {
  denominacion: string;
  especificaciones: string;
  tipo: Id;
  marcaId: Id;
  modeloId: Id;
  activoId: Id;
}
