import { Basica } from '@core/models/basica';

export interface CondicionCompra extends Basica {
  codigo: string;
  denominacion: string;
  explicacion: string;
}
