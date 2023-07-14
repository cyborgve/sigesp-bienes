import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface Modelo extends Basica {
  codigo: string;
  denominacion: string;
  marcaId: Id;
}
