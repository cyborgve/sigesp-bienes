import { Basica } from '@core/models/auxiliares/basica';

export interface TipoPoliza extends Basica {
  codigo: string;
  denominacion: string;
}
