import { pipe, of } from 'rxjs';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { SedeService } from '@core/services/definiciones/sede.service';
import { Id } from '@core/types/id';
import { map, switchMap } from 'rxjs/operators';
import { Activo } from '@core/models/definiciones/activo';

export const filtrarActivosPorPais = (
  pais: Id,
  _sede: SedeService,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      pais && pais !== 'Todos'
        ? _sede.buscarTodos().pipe(
            map(sedes => sedes.filter(sede => sede.paisId === pais)),
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
