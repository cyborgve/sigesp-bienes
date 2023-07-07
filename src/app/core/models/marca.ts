import { Basica } from '@core/models/auxiliares/basica';

export interface Marca extends Basica {
  codigo: string;
  denominacion: string;
  tipo: string;
}
