import { Basica } from '@core/models/auxiliares/basica';

export interface Correlativo extends Basica {
  denominacion: string;
  serie: number;
  correlativo: number;
}
