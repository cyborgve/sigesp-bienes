import { Basica } from '@core/models/basica';

export interface EstadoUso extends Basica {
  codigo: string;
  denominacion: string;
}
