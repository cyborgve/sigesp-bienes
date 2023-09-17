import { Id } from '@core/types/id';
import { Basica } from './basica';

export interface ComponenteProceso extends Basica {
  codigo: string;
  proceso: Id;
  componente: Id;
  tipoComponente: Id;
  denominacion: string;
}
