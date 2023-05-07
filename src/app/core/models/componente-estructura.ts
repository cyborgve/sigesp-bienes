import { Basica } from '@core/models/basica';

export interface ComponenteEstructura extends Basica {
  tipo: string;
  codigo: string;
  denominacion: string;
}
