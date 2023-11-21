import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';

export const adaptarUnidadAdministrativa = () => pipe(map(adaptar));
export const adaptarUnidadesAdministrativas = () =>
  pipe(
    map((unidadesAdministrativas: any[]) =>
      unidadesAdministrativas.map(adaptar)
    )
  );

const adaptar = (unidadAdministrativa: any) =>
  <UnidadAdministrativa>{
    empresaId: Number(unidadAdministrativa.empresaId),
    id: Number(unidadAdministrativa.id),
    codigo: unidadAdministrativa.codigo,
    denominacion: unidadAdministrativa.denominacion,
    categoria: unidadAdministrativa.categoria,
    unidadOrganizativa: unidadAdministrativa.unidadOrganizativa,
    responsable: unidadAdministrativa.responsable,
    creado: unidadAdministrativa.creado,
    modificado: unidadAdministrativa.modificado,
  };
