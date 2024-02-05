import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { from } from 'rxjs';
import { groupBy, mergeMap, tap, toArray } from 'rxjs/operators';

export const agruparActivosPorUbicacion = (activos: ActivoUbicacion[]) => {
  return transformarValores(activos);
};

type DatosComparacion = Pick<
  ActivoUbicacion,
  'unidadAdministrativaId' | 'sedeId' | 'responsableId' | 'responsableUsoId'
>;

const transformarValores = (activosUbicacion: ActivoUbicacion[]) => {
  from(activosUbicacion).pipe(
    groupBy(activo => activo.unidadAdministrativaId),
    mergeMap(grupos$ => grupos$.pipe(toArray())),
    toArray(),
    tap(console.log)
  );
};
