import { Basica } from '@core/models/basica';

export interface ComponenteActivo extends Basica {
  codigo: string;
  denominacion: string;
  tipo: string;
  marcaId: string;
  modeloId: string;
}
