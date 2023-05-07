import { Basica } from '@core/models/basica';

export interface Marca extends Basica {
  tipo: string;
  codigo: string;
  denominacion: string;
}
