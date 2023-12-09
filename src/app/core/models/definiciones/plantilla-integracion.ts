import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';

export interface PlantillaIntegracion extends Basica {
  codigo: string;
  denominacion: string;
  metodoDepreciacion: MetodoDepreciacion;
  cuentaContableGasto: Id;
  cuentaContableDepreciacion: Id;
  vidaUtil: number;
  unidadVidaUtil: string;
}
