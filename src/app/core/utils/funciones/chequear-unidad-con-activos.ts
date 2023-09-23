import { map } from 'rxjs/operators';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { Id } from '@core/types/id';
import { MatSnackBar } from '@angular/material/snack-bar';

export const chequearUnidadConActivos = (
  unidadAdministrativa: Id,
  _activo: ActivoService,
  _snackBar: MatSnackBar
) =>
  _activo.buscarTodos().pipe(
    _activo.filtrarPorUnidadAdministrativa(unidadAdministrativa),
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
