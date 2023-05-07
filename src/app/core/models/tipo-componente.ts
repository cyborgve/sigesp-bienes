import { Basica } from '@core/models/basica';

export interface TipoComponente extends Basica {
  codigo: string;
  denominacion: string;
}
