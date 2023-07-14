import { Codigo } from '@core/types/codigo';
import { Basica } from '@core/models/auxiliares/basica';

export interface TipoAnimal extends Basica {
  codigo: Codigo;
  denominacion: string;
}
