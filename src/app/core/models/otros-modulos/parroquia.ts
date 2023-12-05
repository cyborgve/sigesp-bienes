import { Id } from '@core/types/id';

export interface Parroquia {
  id: Id;
  codigo: string;
  pais: string;
  estado: string;
  municipio: string;
  denominacion: string;
  creado: Date;
  modificado: Date;
}
