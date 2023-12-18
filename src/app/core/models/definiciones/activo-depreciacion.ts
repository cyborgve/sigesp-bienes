import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';
import { UnidadDeTiempo } from '@core/types/unidades-tiempo';

export interface ActivoDepreciacion extends Basica {
  activoId: Id;
  depreciable: number;
  metodoDepreciacion: MetodoDepreciacion;
  cuentaContableDebe: string;
  cuentaContableHaber: string;
  vidaUtil: number;
  unidadVidaUtil: UnidadDeTiempo;
  valorRescate: number;
  monedaValorRescate: string;
}
