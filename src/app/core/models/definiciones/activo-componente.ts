import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';

export interface ActivoComponente extends Basica {
  activoId: Id;
  tipoComponenteId: Id;
  codigo: string;
  denominacion: string;
  modeloId: Id;
  costo: number;
  moneda: Id;
  especificaciones: string;
}
