import { Basica } from '@core/models/basica';

export interface Sede extends Basica {
  codigo: string;
  denominacion: string;
  tipo: string;
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
