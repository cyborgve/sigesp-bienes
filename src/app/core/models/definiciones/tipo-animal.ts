import { Basica } from '@core/models/auxiliares/basica';

export interface TipoAnimal extends Basica {
  codigo: string;
  denominacion: string;
}
