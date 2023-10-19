import { Basica } from '../auxiliares/basica';

export interface LineEnterprise extends Basica {
  codigo: string;
  denominacion: string;
  titulo: string;
  rif: string;
  direccion: string;
}
