import { Basica } from '@core/models/basica';

export interface Modelo extends Basica {
  marcaId: number;
  codigo: string;
  denominacion: string;
}
