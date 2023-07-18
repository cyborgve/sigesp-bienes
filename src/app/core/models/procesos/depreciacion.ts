import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';

export interface Depreciacion extends Basica {
  comprobante: Id;
  activo: Id;
  serial: string;
  identificador: string;
  fechaCompra: Date;
  fechaIncorporacion: Date;
  metodo: MetodoDepreciacion;
  costo: number;
  valorRescate: number;
  montoDepreciar: number;
  vidaUtil: number;
  depreciacionMensual: number;
  depreciacionAnual: number;
  observaciones: string;
  detalles: DepreciacionDetalle[];
}

export interface DepreciacionDetalle extends Basica {
  comprobante: Id;
  fecha: Date;
  meses: number;
  dias: number;
  depreciacionAnual: number;
  depreciacionMensual: number;
  depreciacionAcumulada: number;
  valorContable: number;
}
