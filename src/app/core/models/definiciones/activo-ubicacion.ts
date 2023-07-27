import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';

export interface ActivoUbicacion extends Basica {
  activoId: Id;
  sedeId: Id;
  unidadAdministrativaId: Id;
  fechaIngreso: Date;
  estadoUsoId: Id;
  estadoConservacionId: Id;
  descripcionEstadoConservacion: string;
  responsableId: Id;
  responsableUsoId: Id;
}
