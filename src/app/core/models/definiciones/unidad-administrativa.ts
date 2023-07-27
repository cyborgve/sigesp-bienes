import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface UnidadAdministrativa extends Basica {
  codigo: string;
  categoria: Id;
  denominacion: string;
}
