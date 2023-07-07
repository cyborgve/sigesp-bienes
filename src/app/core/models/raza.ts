import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface Raza extends Basica {
  codigo: string;
  tipoAnimalId: Id;
  denominacion: string;
}
