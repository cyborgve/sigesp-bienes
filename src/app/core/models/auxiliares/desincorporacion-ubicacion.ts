import { Id } from '@core/types/id';
import { Basica } from './basica';

export interface DesincorporacionUbicacion extends Basica {
  proceso: Id;
  activo: Id;
  unidadAdministrativa: Id;
  sede: Id;
  responsable: Id;
  responsableUso: Id;
}
