import { Id } from '@core/types/id';

export interface Ciudad {
  id: Id;
  codigo: string;
  pais: string;
  estado: string;
  denominacion: string;
  creado: Date;
  modificado: Date;
}
