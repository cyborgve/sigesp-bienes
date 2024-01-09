import { TipoActivo } from '@core/types/tipo-activo';
import { Basica } from './basica';
import { Id } from '@core/types/id';
import { TipoProceso } from '@core/types/tipo-proceso';

export interface ActivoListaRetorno extends Basica {
  tipoProceso: TipoProceso;
  proceso: Id;
  fechaProceso: Date;
  activo: Id;
  tipoActivo: TipoActivo;
  codigo: string;
  denominacion: string;
}
