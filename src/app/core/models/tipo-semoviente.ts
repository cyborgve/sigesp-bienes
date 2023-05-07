import { Basica } from '@core/models/basica';

export interface TipoSemoviente extends Basica {
  codigo: string;
  denominacion: string;
}
