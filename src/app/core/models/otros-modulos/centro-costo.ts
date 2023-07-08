import { Codigo } from '@core/types/codigo';
import { Basica } from '../auxiliares/basica';

export interface CentroCosto extends Basica {
  codigo: Codigo;
  denominacion: string;
}
