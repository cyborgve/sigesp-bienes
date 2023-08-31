import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface CambioResponsable extends Basica {
  comprobante: Id;
  activo: Id;
  identificador: string;
  serial: string;
  tipoResponsable: number;
  responsableActual: Id;
  nuevoResponsable: Id;
  observaciones: string;
}
