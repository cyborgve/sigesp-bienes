import { switchMap, map } from 'rxjs/operators';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { pipe } from 'rxjs';

export const reversarCambioResponsable = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((cambioRespsonsable: CambioResponsable) =>
      _activoUbicacion.buscarPorActivo(cambioRespsonsable.activo).pipe(
        switchMap(activoUbicacion => {
          if (Number(cambioRespsonsable.tipoResponsable) === 0)
            activoUbicacion.responsableId =
              cambioRespsonsable.responsableActual;
          else if (Number(cambioRespsonsable.tipoResponsable) === 1)
            activoUbicacion.responsableUsoId =
              cambioRespsonsable.responsableActual;
          return _activoUbicacion
            .actualizar(activoUbicacion.id, activoUbicacion, undefined, false)
            .pipe(map(() => cambioRespsonsable));
        })
      )
    )
  );
