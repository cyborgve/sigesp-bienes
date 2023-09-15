import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface EntregaUnidad extends Basica {
  comprobante: Id;
  unidadAdministrativa: Id;
  sede: Id;
  responsableAnterior: Id;
  nuevoResponsable: Id;
  observaciones: string;
}
