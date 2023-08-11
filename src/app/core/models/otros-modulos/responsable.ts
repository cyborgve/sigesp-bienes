import { Basica } from '../auxiliares/basica';

export interface Responsable extends Basica {
  codigo: string;
  cedula: string;
  rif: string;
  nombre: string;
  apellido: string;
}
