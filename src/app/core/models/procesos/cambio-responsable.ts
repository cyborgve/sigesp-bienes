import { Id } from '@core/types/id';
import { TipoResponsable } from '@core/types/tipo-responsable';
import { Basica } from '../auxiliares/basica';

export interface CambioResponsable extends Basica {
  comprobante: Id;
  activo: Id;
  identificador: string;
  serial: string;
  tipoResponsable: TipoResponsable;
  responsableActual: Id;
  nuevoResponsable: Id;
  observaciones: string;
}
