import { Id } from '@core/types/id';

export interface ActivoListaInventario {
  codigo: string;
  tipo: string;
  denominacion: string;
  identificador: string;
  estado: Id;
  marcaModelo: Id;
  serial: string;
  condicion: Id;
  creado: string;
  modificado: string;
  precio: string;
}
