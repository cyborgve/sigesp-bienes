import { switchMap, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { comprobarActivoIncorporado } from '@core/utils/funciones/comprobar-activo-incorporado';
export const filtrarActivosSinIncorporar = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      _activoUbicacion.buscarTodos().pipe(
        map(ubicaciones =>
          ubicaciones.filter(
            ubicacion => !comprobarActivoIncorporado(ubicacion)
          )
        ),
        map(ubicaciones => ubicaciones.map(ubicacion => ubicacion.activoId)),
        map(ids => activos.filter(activo => ids.includes(activo.id)))
      )
    )
  );
