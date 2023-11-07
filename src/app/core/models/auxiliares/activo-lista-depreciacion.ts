import { TipoActivo } from '@core/types/tipo-activo';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';

export interface ActivoListaDepreciacion {
  fechaDepreciacion: string;
  codigo: string;
  denominacion: string;
  tipo: string;
  identificador: string;
  valorInicial: string;
  valorRescate: string;
  montoDepreciar: string;
  metodoDepreciacion: string;
  depreciacionMensual: string;
  depreciacionAnual: string;
  depreciacionAcumulada: string;
  valorContable: string;
}
