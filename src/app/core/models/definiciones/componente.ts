import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface Componente extends Basica {
  codigo: string;
  denominacion: string;
  tipoComponenteId: Id;
  modeloId: Id;
  activoId: Id;
  especificaciones: string;
}
