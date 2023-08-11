import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';
import { TipoActivo } from '@core/types/tipo-activo';

export interface ActaPrestamo extends Basica {
  comprobante: number;
  unidadAdministrativaCedente: Id;
  unidadCedenteResponsable: Id;
  unidadAdministrativaReceptora: Id;
  unidadReceptoraResponsable: Id;
  testigo: Id;
  notas: string;
  activos: ActaPrestamoActivo[];
}

export interface ActaPrestamoActivo extends Basica {
  actaPrestamo: Id;
  activo: Id;
  codigo: string;
  tipoActivo: TipoActivo;
  denominacion: string;
}
