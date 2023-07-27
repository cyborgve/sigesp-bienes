import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Estado extends Basica {
  codigo: string;
  denominacion: string;
  paisId: Id;
  capital: string;
}
