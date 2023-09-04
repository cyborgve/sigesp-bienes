import { Basica } from '@core/models/auxiliares/basica';

export interface FuenteFinanciamiento extends Basica {
  codigo: string;
  denominacion: string;
  explicacion: string;
}
