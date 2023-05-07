import { Basica } from '@core/models/basica';
import { Codigo } from '@core/types/codigo';

export interface Aseguradora extends Basica {
  codigo: Codigo;
  denominacion: string;
}
