import { Id } from '@core/types/id';

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

interface AsientoContable {
  cuentaContable: String;
  procedencia: 'D' | 'H';
  comprobante: string;
  creado: string;
  descripcion: String;
  monto: number;
  centroCostos: Id;
  unidadOrganizativa: Id;
}

// import { Id } from '@core/types/id';

// export interface ComprobanteContable {
//   tipo: 'contabilizar' | 'reversarContabilizar';
//   bienes: Bien[];
// }

// interface Bien {
//   procede: 'SBNCAJ' | 'SBNCDN' | 'SBNCDP';
//   lineaEmpresaId: Id;
//   unidadAdministrativa: Id;
//   comprobante: string;
//   creado: Date;
//   demoninacion: String;
//   debe: number;
//   centroCostros: Id;
//   fuenteFinanciemiento: Id;
//   cuentasContables: CuentaContable[];
// }

// interface CuentaContable {
//   cuentaContable: string;
//   procedencia: 'D' | 'H';
//   comprobante: string;
//   monto: number;
//   centroCostos: Id;
//   unidadAdminstradora: Id;
// }
