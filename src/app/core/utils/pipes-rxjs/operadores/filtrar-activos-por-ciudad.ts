import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Activo } from '@core/models/definiciones/activo';
import { SedeService } from '@core/services/definiciones/sede.service';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';

export const filtrarActivosPorCiudad = (
  ciudad: Id,
  _sede: SedeService,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      ciudad && ciudad !== 'Todos'
        ? _sede.buscarTodos().pipe(
            map(sedes => sedes.filter(sede => sede.ciudadId === ciudad)),
            map(sedes => sedes.map(sede => sede.id)),
            switchMap(sedes =>
              _activoUbicacion.buscarTodos().pipe(
                map(ubicaciones =>
                  ubicaciones.filter(ubicacion =>
                    sedes.includes(ubicacion.sedeId)
                  )
                ),
                map(ubicaciones =>
                  ubicaciones.map(ubicacion => ubicacion.activoId)
                ),
                map(ubicaciones =>
                  activos.filter(activo => ubicaciones.includes(activo.id))
                )
              )
            )
          )
        : of(activos)
    )
  );
