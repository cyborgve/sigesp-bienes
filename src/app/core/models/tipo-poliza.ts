import { Basica } from '@core/models/basica';

export interface TipoPoliza extends Basica {
  codigo: string;
  denominacion: string;
}
