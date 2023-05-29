import { Basica } from '@core/models/basica';

export interface ComponenteActivo extends Basica {
  tipo: string;
  codigo: string;
  denominacion: string;
  marcaId: string;
  modeloId: string;
}