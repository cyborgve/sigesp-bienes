import { Basica } from '@core/models/auxiliares/basica';

export interface CausaMovimiento extends Basica {
  codigo: string;
  denominacion: string;
  tipo: string;
  estAfectacionContable: number;
  estAfectacionPresupuestaria: number;
}
