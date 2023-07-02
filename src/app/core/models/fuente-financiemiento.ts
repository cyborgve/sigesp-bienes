import { Basica } from '@core/models/basica';

export interface FuenteFinanciemiento extends Basica {
  codigo: string;
  denominacion: string;
  explicacion: string;
}
