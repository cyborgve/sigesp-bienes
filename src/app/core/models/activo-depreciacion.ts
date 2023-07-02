import { Id } from '@core/types/id';
import { Basica } from './basica';

export interface ActivoDepreciacion extends Basica {
  activoId: Id;
  depreciable: boolean;
  metodoDepreciacion: string;
  cuentaContableGasto: string;
  cuentaContableDepreciacion: string;
  vidaUtil: number;
  unidadVidaUtil: string;
  valorRescate: number;
  monedaValorRescate: string;
}
