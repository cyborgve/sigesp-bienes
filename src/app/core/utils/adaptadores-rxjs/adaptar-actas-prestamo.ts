import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarActasPrestamo = () =>
  pipe(
    map((actasPrestamo: any[]) =>
      actasPrestamo.map(
        resultado =>
          <ActaPrestamo>{
            empresaId: Number(resultado.empresaId),
            id: Number(resultado.id),
            comprobante: resultado.comprobante,
            unidadAdministrativaCedente: Number(
              resultado.unidadAdministrativaCedente
            ),
            unidadCedenteResponsable: resultado.unidadCedenteResponsable,
            unidadAdministrativaReceptora: Number(
              resultado.unidadAdministrativaReceptora
            ),
            unidadReceptoraResponsable: resultado.unidadReceptoraResponsable,
            testigo: resultado.testigo,
            activos: resultado.activos,
            notas: resultado.notas,
            creado: resultado.creado,
            modificado: resultado.modificado,
          }
      )
    )
  );
