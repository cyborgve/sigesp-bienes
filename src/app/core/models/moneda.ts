import { Basica } from './auxiliares/basica';
import { Codigo } from '../types/codigo';

export interface Moneda extends Basica {
  codigo: Codigo;
  denominacion: string;
  iso: string;
  simbolo: string;
  separadorDecimal: string;
  separadorMiles: string;
  decimales: number;
}
