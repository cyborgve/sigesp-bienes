import { Basica } from '@core/models/basica';

export interface UnidadAdministrativa extends Basica {
  codigo: string;
  categoriaId: number;
  denominacion: string;
}
