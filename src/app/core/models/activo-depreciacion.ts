import { Id } from '@core/types/id';

export interface ActivoDepreciacion {
  empresaId: Id;
  id: Id;
  activoId: Id;
  depreciable: boolean;
  metodoDepreciacion: string;
  cuentaContableGasto: string;
  cuentaContableDepreciacion: string;
  vidaUtil: number;
  unidadVidaUtil: string;
  valorRescate: number;
  monedaValorRescate: string;
  creado: Date;
  modificado: Date;
}
