import { Basica } from '@core/models/auxiliares/basica';

export interface TipoCobertura extends Basica {
  codigo: string;
  denominacion: string;
}
