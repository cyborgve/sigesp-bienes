import { Basica } from '@core/models/basica';

export interface ComponenteEstructura extends Basica {
  codigo: string;
  denominacion: string;
  tipo: string;
}
