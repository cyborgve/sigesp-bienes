import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';
import { Codigo } from '@core/types/codigo';

export interface PlantillaDepreciacion extends Basica {
  codigo: Codigo;
  denominacion: string;
  metodoDepreciacion: MetodoDepreciacion;
  cuentaContableGasto: Id;
  cuentaContableDepreciacion: Id;
  vidaUtil: number;
  unidadVidaUtil: string;
}
