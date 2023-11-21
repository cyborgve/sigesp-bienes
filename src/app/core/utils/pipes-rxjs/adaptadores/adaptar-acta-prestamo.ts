import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarActaPrestamo = () => pipe(map(adaptar));
export const adaptarActasPrestamo = () =>
  pipe(map((actasPrestamo: any[]) => actasPrestamo.map(adaptar)));

const adaptar = (entidad: any) =>
  <ActaPrestamo>{
    empresaId: Number(entidad.empresaId),
    id: Number(entidad.id),
    comprobante: entidad.comprobante,
    unidadAdministrativaCedente: Number(entidad.unidadAdministrativaCedente),
    unidadCedenteResponsable: entidad.unidadCedenteResponsable,
    unidadAdministrativaReceptora: Number(
      entidad.unidadAdministrativaReceptora
    ),
    unidadReceptoraResponsable: entidad.unidadReceptoraResponsable,
    testigo: entidad.testigo,
    activos: entidad.activos ? entidad.activos : [],
    notas: entidad.notas,
    creado: entidad.creado,
    modificado: entidad.modificado,
  };
