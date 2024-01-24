import { Id } from '@core/types/id';
import { AsientoContable } from './asiento-contable';

export interface ComprobanteContable {
  procede: 'SBNCAJ' | 'SBNCDN' | 'SBNCDP';
  lineaEmpresa: Id;
  unidadAdministrativa: Id;
  comprobante: string;
  creado: string;
  descripcion: String;
  monto: number;
  centroCostos: Id;
  fuenteFinanciamiento?: Id;
  asientosContables: AsientoContable[];
  aprobado: number;
}
