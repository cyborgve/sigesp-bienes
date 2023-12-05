import { Basica } from '../auxiliares/basica';

export interface Estado extends Basica {
  codigo: string;
  denominacion: string;
  pais: string;
  capital: string;
}
