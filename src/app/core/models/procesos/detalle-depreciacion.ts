import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';

export interface DetalleDepreciacion extends Basica {
  proceso: Id;
  fechaDepreciacion: string;
  meses: number;
  dias: number;
  depreciacionMensual: number;
  depreciacionAnual: number;
  depreciacionAcumulada: number;
  valorContable: number;
}
