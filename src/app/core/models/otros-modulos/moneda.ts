import { Id } from '@core/types/id';

export interface Moneda {
  id: Id;
  codigo: string;
  denominacion: string;
  iso: string;
  simbolo: string;
  creado: Date;
  modificado: Date;
}
