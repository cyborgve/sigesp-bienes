import { Basica } from '@core/models/auxiliares/basica';
import { Codigo } from '@core/types/codigo';

export interface TipoUso extends Basica {
  codigo: Codigo;
  denominacion: string;
}
