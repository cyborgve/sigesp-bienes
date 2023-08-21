import { Id } from '@core/types/id';

export interface Empresa {
  id: Id;
  rif: string;
  nombre: string;
  nombreAbreviado: string;
  direccion: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
  paginaWeb: string;
}
