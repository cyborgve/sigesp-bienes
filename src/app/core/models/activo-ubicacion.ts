import { Id } from '@core/types/id';
import { Basica } from './auxiliares/basica';

export interface ActivoUbicacion extends Basica {
  activoId: Id;
  sedeId: Id;
  unidadAdministrativaId: Id;
  fechaIngreso: Date;
  responsableId: Id;
  responsableUsoId: Id;
  estadoUsoId: Id;
  estado_conservacionId: Id;
  descripcionEstadoConservacion: string;
}
