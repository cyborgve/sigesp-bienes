import { Basica } from '@core/models/auxiliares/basica';

export interface EstadoConservacion extends Basica {
  codigo: string;
  denominacion: string;
}
