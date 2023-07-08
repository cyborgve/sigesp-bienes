import { Codigo } from '@core/types/codigo';
import { Basica } from './auxiliares/basica';
import { Id } from '@core/types/id';

export interface UnidadAdministrativa extends Basica {
  codigo: Codigo;
  categoria: Id;
  denominacion: string;
}
