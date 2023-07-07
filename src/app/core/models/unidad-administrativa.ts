import { Basica } from '@core/models/auxiliares/basica';

export interface UnidadAdministrativa extends Basica {
  codigo: string;
  denominacion: string;
  categoria: number;
}
