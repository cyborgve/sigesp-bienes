import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarActaPrestamo = () =>
  pipe(
    map(
      (actaPrestamo: any) =>
        <ActaPrestamo>{
          empresaId: Number(actaPrestamo.empresaId),
          id: Number(actaPrestamo.id),
          comprobante: actaPrestamo.comprobante,
          unidadAdministrativaCedente: Number(
            actaPrestamo.unidadAdministrativaCedente
          ),
          unidadCedenteResponsable: actaPrestamo.unidadCedenteResponsable,
          unidadAdministrativaReceptora: Number(
            actaPrestamo.unidadAdministrativaReceptora
          ),
          unidadReceptoraResponsable: actaPrestamo.unidadReceptoraResponsable,
          testigo: actaPrestamo.testigo,
          activos: actaPrestamo.activos ? actaPrestamo.activos : [],
          notas: actaPrestamo.notas,
          creado: actaPrestamo.creado,
          modificado: actaPrestamo.modificado,
        }
    )
  );
