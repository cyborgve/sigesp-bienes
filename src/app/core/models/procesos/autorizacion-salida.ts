import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { ActivoProceso } from '../auxiliares/activo-proceso';

export interface AutorizacionSalida extends Basica {
  comprobante: string;
  unidadAdministrativa: Id;
  empresaAutorizada: Id;
  personaAutorizada: Id;
  testigo: Id;
  explicacion: string;
  observaciones: string;
  activos: ActivoProceso[];
}
