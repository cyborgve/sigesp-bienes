import { Basica } from '../auxiliares/basica';

export interface Moneda extends Basica {
  codigo: string;
  denominacion: string;
  iso: string;
  simbolo: string;
  separadorDecimal: string;
  separadorMiles: string;
  decimales: number;
}
