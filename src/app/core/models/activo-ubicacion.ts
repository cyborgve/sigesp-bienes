import { Id } from '@core/types/id';

export interface ActivoUbicacion {
  empresaId: Id;
  id: Id;
  activoId: Id;
  sedeId: Id;
  unidadAdministrativaId: Id;
  fechaIngreso: Date;
  responsableId: Id;
  responsableUsoId: Id;
  estadoUsoId: Id;
  estado_conservacionId: Id;
  descripcionEstadoConservacion: string;
  creado: Date;
  modificado: Date;
}
