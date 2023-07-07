import { Basica } from '@core/models/auxiliares/basica';
import { Codigo } from '@core/types/codigo';
import { Id } from '@core/types/id';

export interface Sede extends Basica {
  codigo: Codigo;
  denominacion: string;
  tipoSede: string;
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
