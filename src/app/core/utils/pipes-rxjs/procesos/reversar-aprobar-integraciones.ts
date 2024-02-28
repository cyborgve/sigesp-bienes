import { MatSnackBar } from '@angular/material/snack-bar';
import { Integracion } from '@core/models/procesos/integracion';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { forkJoin, pipe } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

export const reversarAprobarIntegraciones = (
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
      let reversarAprobarIntegraciones = integracionesCandidatas(
        integraciones
      ).map(integracion => {
        let { id, procesoTipo } = integracion;
        return _integracion.eliminar(id, undefined, false);
      });
      return forkJoin(reversarAprobarIntegraciones).pipe(
        map(aprobacionesReversadas => {
          let mensaje = `Se han procesado ${aprobacionesReversadas.length} reversos de aprobaciones`;
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
    integracion => integracion.registrado === 1 && integracion.aprobado === 0
  );
