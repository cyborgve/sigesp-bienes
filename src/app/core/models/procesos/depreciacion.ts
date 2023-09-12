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
  detalles: DetalleDepreciacion[];
}

export interface DetalleDepreciacion extends Basica {
  fechaDepreciacion: string;
  meses: number;
  dias: number;
  depreciacionMensual: number;
  depreciacionAnual: number;
  depreciacionAcumulada: number;
  valorContable: number;
}
