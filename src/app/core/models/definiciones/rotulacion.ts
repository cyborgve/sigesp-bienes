import { Codigo } from '@core/types/codigo';
import { Basica } from '@core/models/auxiliares/basica';

export interface Rotulacion extends Basica {
  codigo: Codigo;
  denominacion: string;
}
