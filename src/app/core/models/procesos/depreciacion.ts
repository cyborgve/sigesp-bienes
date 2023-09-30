import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';
import { DetalleDepreciacion } from './detalle-depreciacion';

export interface Depreciacion extends Basica {
  comprobante: Id;
  activo: Id;
  serial: string;
  identificador: string;
  fechaCompra: Date;
  fechaIncorporacion: Date;
  metodo: MetodoDepreciacion;
  moneda: Id;
  costo: number;
  valorRescate: number;
  montoDepreciar: number;
  vidaUtil: number;
  depreciacionMensual: number;
  depreciacionAnual: number;
  observaciones: string;
  detalles: DetalleDepreciacion[];
}
