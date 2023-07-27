import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';

export interface Seguro extends Basica {
  activoId: Id;
  codigo: string;
  denominacion: string;
  aseguradoraId: Id;
  tipoPolizaId: Id;
  tipoCoberturaId: Id;
  numeroPoliza: string;
  montoAsegurado: number;
  fechaInicioPoliza: Date;
  fechaFinPoliza: Date;
  monedaId: Id;
  monedaSecundariaId: Id;
  poseeRCV: number;
  descripcionCobertura: string;
  coberturaAdicional: string;
}
