import { Basica } from './auxiliares/basica';

export interface ActivoDepreciacion extends Basica {
  depreciable: boolean;
  metodoDepreciacion: string;
  cuentaContableGasto: string;
  cuentaContableDepreciacion: string;
  vidaUtil: number;
  unidadVidaUtil: string;
  valorRescate: number;
  monedaValorRescate: string;
}
