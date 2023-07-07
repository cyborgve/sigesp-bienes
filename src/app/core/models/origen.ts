import { Basica } from '@core/models/auxiliares/basica';

export interface Origen extends Basica {
  codigo: string;
  denominacion: string;
  fechaOrigen: Date;
  fechaAdquisicion: Date;
  modoAdquisicion: string;
  formaAdquisicion: string;
  numeroFormaAdquisicion: string;
  nombreFormaAdquisicion: string;
  fechaFactura: Date;
  numeroFactura: string;
  proveedorId: string;
  tomo: string;
  folio: string;
  nombrePropietarioAnterior: string;
  nombreBenefactor: string;
  nombreBeneficiario: string;
  observaciones: string;
}
