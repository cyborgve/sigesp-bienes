import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';

export interface DepreciacionActivo extends Basica {
  comprobante: Id;
  activo: Id;
  serial: string;
  identificador: string;
  fechaCompra: Date;
  fechaIncorporacion: Date;
  metodoDepreciacion: MetodoDepreciacion;
  observaciones: string;
}
