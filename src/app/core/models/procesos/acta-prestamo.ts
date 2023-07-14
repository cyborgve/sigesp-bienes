import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface ActaPrestamo extends Basica {
  comprobante: number;
  unidadAdministrativaCedente: Id;
  unidadCedenteResponsable: Id;
  unidadAdministrativaReceptora: Id;
  unidadReceptoraResponsable: Id;
  testigo: Id;
  notas: string;
}
