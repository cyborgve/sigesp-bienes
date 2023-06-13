import { Basica } from './basica';

export interface Correlativo extends Basica {
  denominacion: string;
  serie: number;
  correlativo: number;
}
