import { Basica } from '../auxiliares/basica';

export interface Responsable extends Basica {
  cedula: string;
  nombre: string;
  apellido: string;
  cargo: string;
}
