import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface AutorizacionSalida extends Basica {
  comprobante: Id;
  unidadAdministrativaCedente: Id;
  empresaPresonalEntrega: Id;
  representanteEmpresa: string;
  explicacion: string;
  observaciones: string;
}
