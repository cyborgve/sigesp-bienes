import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';
import { ActivoProceso } from '../auxiliares/activo-proceso';

export interface ActaPrestamo extends Basica {
  comprobante: string;
  unidadAdministrativaCedente: Id;
  unidadCedenteResponsable: Id;
  unidadAdministrativaReceptora: Id;
  unidadReceptoraResponsable: Id;
  testigo: Id;
  notas: string;
  activos: ActivoProceso[];
}
