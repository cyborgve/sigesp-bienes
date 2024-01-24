import { Id } from '@core/types/id';

export interface AsientoContable {
  cuentaContable: String;
  procedencia: 'D' | 'H';
  comprobante: string;
  creado: string;
  descripcion: String;
  monto: number;
  centroCostos: Id;
  unidadOrganizativa: Id;
}
