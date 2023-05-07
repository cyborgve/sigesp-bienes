import { Basica } from '@core/models/basica';

export interface TipoMarca extends Basica {
  codigo: string;
  denominacion: string;
}
