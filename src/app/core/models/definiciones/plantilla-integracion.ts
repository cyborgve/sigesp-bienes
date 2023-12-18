import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';

export interface PlantillaIntegracion extends Basica {
  codigo: string;
  denominacion: string;
  tipoPlantilla: string;
  metodoDepreciacion: MetodoDepreciacion;
  cuentaContableDebe: Id;
  cuentaContableHaber: Id;
  vidaUtil: number;
  unidadVidaUtil: string;
}
