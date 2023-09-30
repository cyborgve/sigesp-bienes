import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';

export const prepararActaPrestamo = (actaPrestamo: any) => {
  return <ActaPrestamo>{
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
    activos: actaPrestamo.activos,
    notas: actaPrestamo.notas,
    creado: actaPrestamo.creado,
    modificado: actaPrestamo.modificado,
  };
};
