import { Basica } from '@core/models/basica';

export interface TipoSede extends Basica {
  codigo: string;
  denominacion: string;
}
