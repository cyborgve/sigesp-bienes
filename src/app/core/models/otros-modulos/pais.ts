import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Pais {
  id: Id;
  codigo: String;
  denominacion: string;
  creado: Date;
  modificado: Date;
}
