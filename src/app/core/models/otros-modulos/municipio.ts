import { Id } from '@core/types/id';

export interface Municipio {
  id: Id;
  pais: string;
  estado: string;
  codigo: string;
  denominacion: string;
  capital: string;
  creado: Date;
  modificado: Date;
}
