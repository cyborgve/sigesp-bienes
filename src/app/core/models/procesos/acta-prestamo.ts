import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';
import { TipoActivo } from '@core/types/tipo-activo';
import { ActivoProceso } from '../auxiliares/activo-proceso';

export interface ActaPrestamo extends Basica {
  comprobante: number;
  unidadAdministrativaCedente: Id;
  unidadCedenteResponsable: Id;
  unidadAdministrativaReceptora: Id;
  unidadReceptoraResponsable: Id;
  testigo: Id;
  notas: string;
  activos: ActivoProceso[];
}
