import { Basica } from '@core/models/auxiliares/basica';

export interface Aseguradora extends Basica {
  codigo: string;
  denominacion: string;
}
