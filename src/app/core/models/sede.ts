import { Basica } from '@core/models/basica';

export interface Sede extends Basica {
  tipo: String;
  codigo: string;
  denominacion: string;
  localizacion: string;
  paisId: string;
  estadoId: string;
  municipioId: string;
  parroquiaId: string;
  ciudadId: string;
  urbanizacion: string;
  calleAvenida: string;
  casaEdificio: string;
  piso: string;
}
