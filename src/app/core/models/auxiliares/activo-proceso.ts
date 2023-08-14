import { TipoActivo } from '@core/types/tipo-activo';
import { Basica } from './basica';
import { Id } from '@core/types/id';

export interface ActivoProceso extends Basica {
  proceso: Id;
  activo: Id;
  tipoActivo: TipoActivo;
  codigo: string;
  denominacion: string;
}
