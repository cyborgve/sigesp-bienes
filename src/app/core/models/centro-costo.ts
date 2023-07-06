import { Codigo } from '@core/types/codigo';
import { Basica } from './basica';

export interface CentroCosto extends Basica {
  codigo: Codigo;
  denominacion: string;
}
