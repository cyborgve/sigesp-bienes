import { Basica } from '@core/models/basica';

export interface TipoCobertura extends Basica {
  codigo: string;
  denominacion: string;
}
