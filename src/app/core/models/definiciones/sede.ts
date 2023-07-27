import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface Sede extends Basica {
  codigo: string;
  denominacion: string;
  tipoSedeId: Id;
  localizacion: string;
  paisId: Id;
  estadoId: Id;
  municipioId: Id;
  parroquiaId: Id;
  ciudadId: Id;
  urbanizacion: string;
  calleAvenida: string;
  casaEdificio: string;
  piso: number;
}
