import { Basica } from './basica';

export interface CausaMovimiento extends Basica {
  codigo: string;
  denominacion: string;
  tipo: string;
  estatusAfectacionContable: string;
  estatusAfectacionPresupuestaria: string;
}
