import { Codigo } from '@core/types/codigo';
import { Basica } from './auxiliares/basica';
import { Id } from '@core/types/id';

export interface ComponenteActivo extends Basica {
  codigo: Codigo;
  denominacion: string;
  tipoComponenteId: Id;
  modeloId: Id;
  especificaciones: string;
}
