import { Id } from '@core/types/id';
import { Basica } from './auxiliares/basica';
import { Codigo } from '@core/types/codigo';

export interface Estado extends Basica {
  codigo: Codigo;
  denominacion: string;
  paisId: Id;
  capital: string;
}
