import { Activo } from '@core/models/definiciones/activo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { SedeService } from '@core/services/definiciones/sede.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorTipoSede = (
  tipoSede: Id,
  _sede: SedeService,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      tipoSede && tipoSede !== 0
        ? _sede.buscarTodos().pipe(
            map(sedes => sedes.filter(sede => sede.tipoSedeId === tipoSede)),
            map(sedes => sedes.map(sede => sede.id)),
            switchMap(sedesIds =>
              _activoUbicacion.buscarTodos().pipe(
                map(ubicaciones =>
                  ubicaciones.filter(ubicacion =>
                    sedesIds.includes(ubicacion.sedeId)
                  )
                ),
                map(ubicaciones =>
                  ubicaciones.map(ubicacion => ubicacion.activoId)
                ),
                map(ubicacionesIds =>
                  activos.filter(activo => ubicacionesIds.includes(activo.id))
                )
              )
            )
          )
        : of(activos)
    )
  );
