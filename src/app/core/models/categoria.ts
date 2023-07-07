import { Basica } from '@core/models/auxiliares/basica';

export interface Categoria extends Basica {
  codigo: string;
  denominacion: string;
}
