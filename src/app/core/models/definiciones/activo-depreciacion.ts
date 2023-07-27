import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface ActivoDepreciacion extends Basica {
  activoId: Id;
  depreciable: number;
  metodoDepreciacion: string;
  cuentaContableGasto: string;
  cuentaContableDepreciacion: string;
  vidaUtil: number;
  unidadVidaUtil: string;
  valorRescate: number;
  monedaValorRescate: string;
}
