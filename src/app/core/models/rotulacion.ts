import { Codigo } from '@core/types/codigo';
import { Basica } from './basica';

export interface Rotulacion extends Basica {
  codigo: Codigo;
  denominacion: string;
}
