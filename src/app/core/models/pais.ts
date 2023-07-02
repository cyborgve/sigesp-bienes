import { Codigo } from '@core/types/codigo';
import { Basica } from './basica';

export interface Pais extends Basica {
  codigo: Codigo;
  denominacion: string;
}
