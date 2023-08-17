import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface Origen extends Basica {
  codigo: string;
  denominacion: string;
  fechaOrigen: Date;
  fechaAdquisicion: Date;
  modoAdquisicion: string;
  numeroFormaAdquisicion: string;
  nombreFormaAdquisicion: string;
  fechaFactura: Date;
  numeroFactura: string;
  proveedorId: Id;
  tomo: string;
  folio: string;
  nombrePropietarioAnterior: string;
  nombreBenefactor: string;
  nombreBeneficiario: string;
  observaciones: string;
}
