import { Basica } from '@core/models/basica';

export interface Modelo extends Basica {
  codigo: string;
  denominacion: string;
  marcaId: number;
}
