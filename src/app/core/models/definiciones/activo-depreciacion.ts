import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';
import { UnidadDeTiempo } from '@core/types/unidades-tiempo';

export interface ActivoDepreciacion extends Basica {
  activoId: Id;
  depreciable: number;
  metodoDepreciacion: MetodoDepreciacion;
  cuentaContableGasto: string;
  cuentaContableDepreciacion: string;
  vidaUtil: number;
  unidadVidaUtil: UnidadDeTiempo;
  valorRescate: number;
  monedaValorRescate: string;
}
