import { Basica } from '@core/models/basica';

export interface Seguro extends Basica {
  codigo: string;
  denominacion: string;
  aseguradoraId: string;
  tipoPoliza: string;
  tipoCobertura: string;
  numeroPoliza: string;
  montoAsegurado: number;
  fechaInicioPoliza: Date;
  fechaFinPoliza: Date;
  monedaId: string;
  monedaSecundariaId: string;
  poseeRCV: boolean;
  descripcionCobertura: string;
  coberturaAdicional: string;
}
