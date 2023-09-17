import { Modificacion } from '@core/models/procesos/modificacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarModificaciones = () =>
  pipe(
    map((modifcaciones: any[]) =>
      modifcaciones.map(
        modificacion =>
          <Modificacion>{
            empresaId: Number(modificacion.empresaId),
            id: Number(modificacion.id),
            comprobante: modificacion.comprobante,
            activo: Number(modificacion.activo),
            identificador: modificacion.identificador,
            serial: modificacion.serial,
            causaMovimiento: Number(modificacion.causaMovimiento),
            observaciones: modificacion.observaciones,
            modificaciones: modificacion.modificaciones
              ? modificacion.modificaciones
              : [],
            cuentasContables: modificacion.cuentasContables
              ? modificacion.cuentasContables
              : [],
            creado: modificacion.creado,
            modificado: modificacion.modificado,
          }
      )
    )
  );
