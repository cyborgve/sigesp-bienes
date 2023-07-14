import { Basica } from '@core/models/auxiliares/basica';

export interface TipoSemoviente extends Basica {
  codigo: string;
  denominacion: string;
}
