import { Basica } from '@core/models/auxiliares/basica';

export interface CondicionCompra extends Basica {
  codigo: string;
  denominacion: string;
  explicacion: string;
}
