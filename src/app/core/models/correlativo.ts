import { Basica } from './auxiliares/basica';

export interface Correlativo extends Basica {
  denominacion: string;
  serie: number;
  correlativo: number;
}
