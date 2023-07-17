import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface Retorno extends Basica {
  comprobante: Id;
  beneficiario: Id;
  activos: Id[];
}
