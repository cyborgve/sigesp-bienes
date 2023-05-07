import { Basica } from '@core/models/basica';

export interface Conservacion extends Basica {
  codigo: string;
  denominacion: string;
}
