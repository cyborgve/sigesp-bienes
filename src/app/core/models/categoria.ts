import { Basica } from '@core/models/basica';

export interface Categoria extends Basica {
  codigo: string;
  denominacion: string;
}
