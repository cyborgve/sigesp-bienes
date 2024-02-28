import { MatSnackBar } from '@angular/material/snack-bar';
import { Integracion } from '@core/models/procesos/integracion';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { forkJoin, pipe } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

export const aprobarIntegraciones = (
  _integracion: IntegracionService,
  _snackBar: MatSnackBar,
  notificar: boolean
) =>
  pipe(
    filter(
      (integraciones: Integracion[]) =>
        integracionesCandidatas(integraciones).length > 0
    ),
    switchMap(integraciones => {
      let aprobarIntegraciones = integracionesCandidatas(integraciones).map(
        integracion => _integracion.guardar(integracion, undefined, false)
      );
      return forkJoin(aprobarIntegraciones).pipe(
        map(integracionesAprobadas => {
          let mensaje = `Se han procesado ${integracionesAprobadas.length} aprobaciones`;
          if (notificar)
            _snackBar.open(mensaje, undefined, {
              duration: 6000,
            });
          return integraciones;
        })
      );
    })
  );

const integracionesCandidatas = (integraciones: Integracion[]) =>
  integraciones.filter(
    integracion => integracion.registrado === 0 && integracion.aprobado === 1
  );
