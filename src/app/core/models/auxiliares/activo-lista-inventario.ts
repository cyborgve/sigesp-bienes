import { Basica } from './basica';

export interface ActivoListaInventario extends Basica {
  codigo: string;
  tipo: string;
  denominacion: string;
  identificador: string;
  estado: string;
  marcaModelo: string;
  serial: string;
  condicion: string;
  precio: string;
}
