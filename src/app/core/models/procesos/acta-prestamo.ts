import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface ActaPrestamo extends Basica {
  comprobante: number;
  unidadAdministrativaCedente: Id;
  unidadCedenteResponsable: Id;
  unidadAdministrativaReceptora: Id;
  unidadReceptoraResponsable: Id;
  testigo: Id;
  observaciones: string;
  activos: ActaPrestamoActivo[];
}

export interface ActaPrestamoActivo extends Basica {
  actaPrestamo: Id;
  activo: Id;
}
