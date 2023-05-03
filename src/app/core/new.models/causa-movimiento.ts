import { Basica } from './basica';

export interface CausaMovimiento extends Basica {
  denominacion: string;
  tipo: string;
  estafecon: string;
  estafepre: string;
}
