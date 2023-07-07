import { Basica } from '@core/models/auxiliares/basica';

export interface FuenteFinanciemiento extends Basica {
  codigo: string;
  denominacion: string;
  explicacion: string;
}
