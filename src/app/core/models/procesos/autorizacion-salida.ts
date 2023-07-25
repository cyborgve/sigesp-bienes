import { Id } from '@core/types/id';
import { Basica } from '../auxiliares/basica';

export interface AutorizacionSalida extends Basica {
  comprobante: Id;
  unidadAdministrativaCedente: Id;
  empresaPersonaEntrega: Id;
  representanteEmpresa: Id;
  explicacion: string;
  observaciones: string;
}

export interface AutorizacionSalidaActivo extends Basica {
  autorizacionSalida: Id;
  activo: Id;
}
