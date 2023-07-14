import { Codigo } from '@core/types/codigo';
import { Id } from '@core/types/id';
import { Basica } from '@core/models/auxiliares/basica';

export interface Seguro extends Basica {
  activoId: Id;
  codigo: Codigo;
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
