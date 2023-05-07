import { Basica } from '@core/models/basica';

export interface TipoEstructura extends Basica {
  codigo: string;
  denominacion: string;
}
