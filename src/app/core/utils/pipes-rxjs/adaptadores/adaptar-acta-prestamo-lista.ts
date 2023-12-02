import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActaPrestamoLista } from '@core/models/auxiliares/acta-prestamo-lista';

export const adaptarActaPrestamoLista = () => pipe(map(adaptar));
export const adaptarActasPrestamoLista = () =>
  pipe(map((actasPrestamo: any[]) => actasPrestamo.map(adaptar)));

const adaptar = (acta: any) =>
  <ActaPrestamoLista>{
    empresa: acta.empresa,
    id: Number(acta.id),
    comprobante: String(acta.comprobante).substring(5),
    unidadAdministrativaCedente: acta.unidadAdministrativaCedente,
    unidadCedenteResponsable: acta.unidadCedenteResponsable,
    unidadAdministrativaReceptora: acta.unidadAdministrativaReceptora,
    unidadReceptoraResponsable: acta.unidadCedenteResponsable,
    testigo: acta.testigo,
    notas: acta.notas,
    creado: acta.creado,
    modificado: acta.modificado,
  };
