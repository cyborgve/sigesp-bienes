import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';
import { ActivoProceso } from '../auxiliares/activo-proceso';

export interface Retorno extends Basica {
  comprobante: Id;
  beneficiario: Id;
  observaciones: string;
  activos: ActivoProceso[];
}
