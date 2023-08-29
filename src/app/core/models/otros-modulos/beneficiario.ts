import { Basica } from '../auxiliares/basica';

export interface Beneficiario extends Basica {
  cedula: string;
  nombre: string;
}
