import { map } from 'rxjs/operators';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { Id } from '@core/types/id';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filtrarActivosPorUnidadAdministrativa } from '../pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';

export const chequearUnidadConActivos = (
  unidadAdministrativa: Id,
  _activo: ActivoService,
  _activoUbicacion: ActivoUbicacionService,
  _snackBar: MatSnackBar
) =>
  _activo.buscarTodos().pipe(
    filtrarActivosPorUnidadAdministrativa(
      unidadAdministrativa,
      _activoUbicacion
    ),
    map(activos => activos.length > 0),
    map(tieneActivos =>
      !tieneActivos && unidadAdministrativa !== 0
        ? _snackBar.open(
            'La Unidad Administrativa seleccionada no tiene Bienes asignados',
            undefined,
            { duration: 4000 }
          )
        : undefined
    )
  );
